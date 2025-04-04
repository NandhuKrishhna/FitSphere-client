export type TransactionQueryParams = {
  page?: number
  limit?: number
  search?: string
  type?: string
  status?: string
  paymentType?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export type Transaction = {
  _id: string;
  amount: number;
  currency: string;
  type: "credit" | "debit" | "failed";
  method: "wallet" | "razorpay";
  paymentType: "slot_booking" | "subscription";
  status: "pending" | "success" | "failed";
  createdAt: string;

  fromDetails: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };

  toDetails: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };
};

export type TransactionResponse = Transaction[];

export interface TransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction
}
