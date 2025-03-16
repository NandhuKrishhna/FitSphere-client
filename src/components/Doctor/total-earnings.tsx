import { useGetWalletQuery } from "@/redux/api/appApi";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { ChevronDown, } from "lucide-react";
import { useSelector } from "react-redux";

interface TotalEarningsProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

export default function TotalEarnings({ selectedView }: TotalEarningsProps) {
  const user = useSelector(selectCurrentUser);
  const { data: walletData } = useGetWalletQuery({ userId: user?._id });

  const balance = walletData?.response?.[0]?.balance || 0;
  const transactions = walletData?.response?.[0]?.transactions || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Total Earnings</h2>
        <div className="bg-gray-500 text-white rounded-md px-3 py-1 flex items-center gap-2">
          <span className="text-sm">{selectedView}</span>
          <ChevronDown size={14} />
        </div>
      </div>


      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">

          <div className="w-full h-full rounded-full border-[15px] border-gray-200"></div>

          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-[15px] border-transparent border-t-yellow-300 border-r-yellow-300 border-b-yellow-300"
            style={{ transform: "rotate(45deg)" }}
          ></div>


          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl text-green-600 font-bold">{balance.toLocaleString()} INR</span>
            <span className="text-xs text-gray-500">Current Balance</span>
          </div>
        </div>
      </div>


      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction._id} className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  transaction.type === "credit" ? "bg-green-600" : "bg-red-600"
                }`}
              ></div>
              <p className="text-sm text-black flex-grow">
                {transaction.description} - {transaction.amount} {transaction.currency}
              </p>
              <span
                className={`text-xs font-semibold ${
                  transaction.type === "credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"} {transaction.amount}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No transactions found.</p>
        )}
      </div>

    </div>
  );
}
