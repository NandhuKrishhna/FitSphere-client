import { WalletHeaderProps } from "@/types/types"
import React from "react"


export const WalletHeader: React.FC<WalletHeaderProps> = ({ balance, currency }) => {
  return (
    <div className="px-4 py-5 sm:p-6 bg-purple-600 text-white">
      <h3 className="text-lg leading-6 font-medium">Your Wallet</h3>
      <div className="mt-2 text-3xl font-bold">
        {currency} {balance.toFixed(2)}
      </div>
    </div>
  )
}