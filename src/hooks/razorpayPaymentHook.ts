import { toast } from "react-hot-toast";
import { initPay } from "../utils/paymentUtils";

interface BookSlotParams {
  doctorId: string;
  patientId: string;
  slotId: string;
  amount: number;
}

interface BookSlotResponse {
  order: any; 
}

export const handleBookSlot = async (
  bookSlots: any,
  params: BookSlotParams,
  onPaymentSuccess: (response: any) => void,
  onPaymentFailure: (error: any) => void
) => {
  const { doctorId, patientId, slotId, amount } = params;

  if (!slotId) {
    toast.error("Please select a slot to book a consultation.");
    return;
  }

  try {
    const response: BookSlotResponse = await bookSlots({
      doctorId,
      patientId,
      slotId,
      amount,
    }).unwrap();

    console.log("Booking response:", response);

    if (!response.order) {
      throw new Error("No order details received from server");
    }

    initPay(response.order, onPaymentSuccess, onPaymentFailure);
  } catch (error) {
    console.error("Error booking slot:", error);
    toast.error("Failed to book slot. Please try again.");
  }
};
