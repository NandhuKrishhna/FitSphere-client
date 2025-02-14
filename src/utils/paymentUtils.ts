import { toast } from "react-hot-toast";
import { RazorpayOrder } from "../types/Payments";


export const initPay = (order: RazorpayOrder, onSuccess: (response: any) => void, onFailure: (error: any) => void) => {

  console.log("Initializing payment with order:", order); 
  if (!(window as any).Razorpay) {
    console.error("Razorpay SDK not loaded");
    toast.error("Razorpay SDK not loaded. Please try again.");
    return;
  }

  if (!order.id || !order.amount || !order.currency) {
    console.error("Missing required order details:", order);
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
    handler: function (response: any) {
      console.log("Payment successful!", response);
      toast.success("Payment successful!");
      onSuccess(response);
    },
    prefill: {
      name: "User Name",
      email: "user@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc",
    },
  };

  console.log("Razorpay options:", options);

  try {
    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      console.error("Payment failed:", response.error);
      toast.error(`Payment failed: ${response.error.description}`);
      onFailure(response.error);
    });

    rzp.open();
  } catch (error) {
    console.error("Error creating Razorpay instance:", error);
    toast.error("Failed to initialize payment");
  }
};
