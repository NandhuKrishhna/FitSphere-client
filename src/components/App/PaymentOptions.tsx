import React from "react";
import { Wallet, CreditCard } from "lucide-react";

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: () => void;
  onSelectRazorpay: () => void;
  amount: number;
}

const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectWallet,
  onSelectRazorpay,
  amount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-2xl animate-fade-in">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Select Payment Method</h2>
          <p className="text-gray-300 mb-6">Choose how you'd like to pay for your appointment</p>

          <div className="space-y-4">
            <button
              onClick={onSelectWallet}
              className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Wallet className="text-purple-400 mr-3 w-6 h-6" />
                <div>
                  <p className="text-white font-medium text-left">Pay with Wallet</p>
                  <p className="text-gray-400 text-sm text-left">Use your existing balance</p>
                </div>
              </div>
              <span className="text-white font-medium">₹{amount}</span>
            </button>

            <button
              onClick={onSelectRazorpay}
              className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <CreditCard className="text-purple-400 mr-3 w-6 h-6" />
                <div>
                  <p className="text-white font-medium text-left">Pay with Razorpay</p>
                  <p className="text-gray-400 text-sm text-left">Credit/Debit card, UPI, and more</p>
                </div>
              </div>
              <span className="text-white font-medium">₹{amount}</span>
            </button>
          </div>
        </div>

        <div className="p-4 flex items-center justify-end border-t border-gray-700">
          <button onClick={onClose} className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionsModal;
