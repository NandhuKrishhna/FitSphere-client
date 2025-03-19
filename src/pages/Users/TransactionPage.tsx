import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import TransactionTable from "@/components/App/transaction-table";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useSelector } from "react-redux";


export default function TransactionsPage() {
  const role = useSelector(selectCurrentUser)?.role
  return (
    <div className="min-h-screen bg-black">
      {role === "user" &&(
        <>
            <Header/>
            <Navigation/>
        </>
      )}
      <div className="pt-10">

      <TransactionTable />
      </div>

    </div>
  )
}



