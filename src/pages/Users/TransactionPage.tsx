import { useGetAllTransactionsQuery } from "@/redux/api/appApi"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import { useSelector } from "react-redux"
import TransactionTable from "./TransactionTable"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"



export default function TransactionPage() {
  const { data, isLoading, error } = useGetAllTransactionsQuery({})
  const currentUser = useSelector(selectCurrentUser)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-full bg-black text-white">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-400">Failed to load transactions</h3>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    )
  }

  return (

    <div className="bg-black text-white min-h-screen">
      <Header/>
      <Navigation/>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <TransactionTable data={data} currentUser={currentUser} />
      </div>
    </div>
  )
}



