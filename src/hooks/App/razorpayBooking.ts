import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useBookSlotsMutation, useVerifyPaymentMutation } from "@/redux/api/appApi";
import { Order, RazorpayErrorResponse, RazorpayResponse } from "@/types/Payments";
import { Slot } from "@/components/App/SlotCalender";

export const useRazorpayBooking = (doctorId: string | null, consultationFee: number) => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookSlots, { isLoading: isBookLoading }] = useBookSlotsMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const handleSlotClick = (slot: Slot) => {
    console.log("Slot selected:", slot);
    setSelectedSlot(slot);
  };

  const initPay = (order: Order) => {
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
      handler: async (response: RazorpayResponse) => {
        try {
          console.log("Payment successful!", response);
          await verifyPayment({ razorpay_order_id: response.razorpay_order_id });
          toast.success("Payment successful!");
          navigate("/appointments");
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.email || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log("Razorpay options:", options);

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: RazorpayErrorResponse) => {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay instance:", error);
      toast.error("Failed to initialize payment");
    }
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) {
      toast.error("Please select a slot to book a consultation.");
      return;
    }
    const patientId = user?._id;
    try {
      const response = await bookSlots({
        doctorId,
        patientId,
        slotId: selectedSlot?._id,
        amount: consultationFee,
      }).unwrap();

      console.log("Booking response:", response);

      if (!response.order) {
        throw new Error("No order details received from server");
      }

      initPay(response.order);
    } catch (error) {
      console.error("Error booking slot:", error);
      toast.error("Failed to book slot. Please try again.");
    }
  };

  return { handleSlotClick, handleBookSlot, isBookLoading, selectedSlot };
};
