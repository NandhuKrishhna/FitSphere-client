import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import TransactionTable from "@/components/App/transaction-table";


export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-black">
    <Header/>
    <Navigation/>
      <div className="pt-10">

      <TransactionTable />
      </div>

    </div>
  )
}



