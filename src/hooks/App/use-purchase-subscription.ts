
import { usePurchaseSubscriptionMutation, useVerifyPaymentMutation } from "@/redux/api/appApi"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { Order, RazorpayResponse } from "@/types/Payments";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../LoginHook";

export const usePurchaseSubscripiton = () => {
    const [verifyPayment] = useVerifyPaymentMutation();
    const [purchaseSubscription] = usePurchaseSubscriptionMutation();

    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const initPay = (order: Order) => {
        if (!(window as any).Razorpay) {
            toast.error("Razorpay SDK not loaded. Please try again.");
            return;
        }
        if (!order.id || !order.amount || !order.currency) {
            toast.error("Invalid order details");
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Appointment Payment",
            description: "Payment for consultation",
            order_id: order.id,
            handler: async (response: RazorpayResponse) => {
                try {
                    await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        paymentType: "subscription",
                        subscriptionId: order.subscriptionId
                    })
                    toast.success("Payment successful!");
                    navigate("/transactions");
                } catch (error) {
                    const err = error as ErrorResponse;
                    if (err.data.message) return toast.error(err.data.message);
                    toast.error("Something went wrong. Please try again.");
                }
            },
            prefill: {
                name: `${user?.name}`,
                email: `${user?.email}`,
                contact: `${user?.email}`,
            },
            theme: { color: "#3399cc" },
            modal: {
                ondismiss: async () => {
                    navigate("/transactions");
                },
            },
        };

        try {
            const rzp = new (window as any).Razorpay(options);
            rzp.on("payment.failed", async () => {
                rzp.close();
                setTimeout(async () => {
                    toast.error("Payment failed try again")
                    navigate("/transactions");
                }, 500);
            });

            rzp.open();
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("Something went wrong. Please try again.");
        }
    }

    const handlePurchaseSubscription = async (id: string) => {
        if (!id) {
            toast.error("Please select a subscription plan");
            return
        }
        try {
            const response = await purchaseSubscription({
                subscriptionId: id
            }).unwrap();
            const order = response.response?.order;
            if (!order) {
                throw new Error("No order details received from server");
            }
            initPay(order);
        } catch (error) {
            console.log(error);
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("Something went wrong. Please try again.");
        }
    }
    return {
        handlePurchaseSubscription,
    }
}