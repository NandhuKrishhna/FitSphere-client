import { useState } from "react";
import {
  useBookSlotsMutation,
  useDoctorDetailsQuery,
  useGetAllSlotDetailsQuery,
  useVerifyPaymentMutation,
} from "../../redux/api/appApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { Order, RazorpayErrorResponse, RazorpayResponse } from "../../types/Payments";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useNavigate } from "react-router-dom";
import { Slot } from "../../components/App/SlotCalender";

export const useDoctorDetails = () => {
  const doctorId = useSelector((state: RootState) => state.appFeat.selectedDoctorId);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("about");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookSlots, { isLoading: isBookLoading }] = useBookSlotsMutation();
  const { data } = useDoctorDetailsQuery({ doctorId });
  const { data: slots } = useGetAllSlotDetailsQuery({ doctorId });
  const [verifyPayment] = useVerifyPaymentMutation();

  const doctorDetails = data?.doctorDetails;
  const selectedDoctorForChat = {
    doctorDetails: {
      name: doctorDetails?.name || "Unknown",
      profilePicture: doctorDetails?.profilePicture || "/avatar.png",
      _id: doctorDetails?._id || "",
    },
  };

  const handleSlotClick = (slot: Slot) => {
    setSelectedSlot(slot);
  };

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
          await verifyPayment({ razorpay_order_id: response.razorpay_order_id });
          toast.success("Payment successful!");
          navigate("/appointments");
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: `${user?.name}`,
        email: `${user?.email}`,
        contact: `${user?.email}`,
      },
      theme: { color: "#3399cc" },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: RazorpayErrorResponse) => {
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Failed to initialize payment");
    }
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) {
      toast.error("Please select a slot to book a consultation.");
      return;
    }
    try {
      const response = await bookSlots({
        doctorId,
        patientId: user?._id,
        slotId: selectedSlot?._id,
        amount: doctorDetails?.details.consultationFees,
      }).unwrap();

      if (!response.order) {
        throw new Error("No order details received from server");
      }

      initPay(response.order);
    } catch (error) {
      console.log(error);
      toast.error("Failed to book slot. Please try again.");
    }
  };

  return {
    doctorDetails,
    slots,
    selectedDoctorForChat,
    activeSection,
    setActiveSection,
    selectedSlot,
    handleSlotClick,
    handleBookSlot,
    isBookLoading,
  };
};
