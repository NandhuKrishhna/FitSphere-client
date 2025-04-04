import React from "react";
import { Check } from "lucide-react";
import { SuccessModalProps } from "@/types/types";

const WalletPaymentSuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, doctorName, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-xl">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-400" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
          <p className="text-gray-300 text-center mb-4">
            Your wallet payment of ₹{amount} for the appointment with Dr. {doctorName} was successful.
          </p>

          <div className="w-full border-t border-gray-700 my-4"></div>

          <p className="text-gray-400 text-sm text-center mb-6">
            You will be redirected to your appointments page shortly.
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors"
          >
            View My Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPaymentSuccessModal;
