import { useState } from "react";
import {
  useBookSlotsMutation,
  useDoctorDetailsQuery,
  useGetAllSlotDetailsQuery,
  useHandleFailedPaymentMutation,
  useVerifyPaymentMutation,
  useWalletPaymentMutation,
} from "../../redux/api/appApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { Order, RazorpayResponse } from "../../types/Payments";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useNavigate } from "react-router-dom";
import { Slot } from "../../components/App/SlotCalender";
import { ErrorResponse } from "../LoginHook";

export const useDoctorDetails = () => {
  const doctorId = useSelector((state: RootState) => state.appFeat.selectedDoctorId);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [walletPayment, { isLoading: isWalletLoading }] = useWalletPaymentMutation();
  const [activeSection, setActiveSection] = useState("about");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookSlots, { isLoading: isBookLoading }] = useBookSlotsMutation();
  const { data } = useDoctorDetailsQuery({ doctorId });
  const { data: slots, refetch } = useGetAllSlotDetailsQuery({ doctorId });
  const [verifyPayment] = useVerifyPaymentMutation();
  const [handleFailedPayment] = useHandleFailedPaymentMutation();
  const [isWalletSuccessModalOpen, setIsWalletSuccessModalOpen] = useState(false);
  const doctorDetails = data?.doctorDetails;
  const selectedDoctorForChat = {
    doctorDetails: {
      name: doctorDetails?.name || "Unknown",
      profilePicture: doctorDetails?.profilePicture || "/avatar.png",
      _id: doctorDetails?._id || "",
    },
    lastMessage: ""
  };
  const handlePaymentFailure = async (orderId: string) => {
    if (!orderId) return;


    try {
      await handleFailedPayment({ orderId: orderId }).unwrap();
    } catch (error) {
      console.error("Failed to record payment failure:", error);
      const err = error as ErrorResponse;
      if (err.data.message) return toast.error(err.data.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
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
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            doctorId: doctorId,
            doctorName: doctorDetails?.name,
            paymentType: "slot_booking"
          })
          toast.success("Payment successful!");
          navigate("/appointments");
        } catch (error) {
          const err = error as ErrorResponse;
          if (err.data.message) return toast.error(err.data.message);
          toast.error("Something went wrong. Please try again.");
          await handlePaymentFailure(order.id);
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
          navigate("/appointments");
        },
      },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", async () => {
        rzp.close();
        setTimeout(async () => {
          await handlePaymentFailure(order.id);
          navigate("/appointments");
        }, 500);
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
      const err = error as ErrorResponse;
      if (err.data.message) return toast.error(err.data.message);
      toast.error("Failed to book slot. Please try again.");
    }
  };

  const handleWalletPayment = async () => {
    if (!selectedSlot) return toast.error("Please select a slot to book a consultation.");
    try {
      const response = await walletPayment({
        usecase: "slot_booking",
        doctorId,
        patientId: user?._id,
        slotId: selectedSlot?._id,
        amount: doctorDetails?.details.consultationFees,
      });
      if ("error" in response) {
        const err = response.error as ErrorResponse;
        if (err?.data?.message) return toast.error(err?.data?.message);

        return toast.error("Failed to book slot. Please try again.");
      }
      setIsWalletSuccessModalOpen(true);
      setTimeout(() => {
        setIsWalletSuccessModalOpen(false);
        navigate("/appointments");
      }, 5000);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err?.data?.message) return toast.error(err?.data?.message);
      toast.error("Failed to book slot. Please try again.");
    }
  };
  const handleSuccessModalClose = () => {
    setIsWalletSuccessModalOpen(false);
    navigate("/appointments");
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
    handleWalletPayment,
    isWalletLoading,
    isWalletSuccessModalOpen,
    handleSuccessModalClose,
    refetch
  };
};
