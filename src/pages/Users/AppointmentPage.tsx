import AppointmentTable from "@/components/App/Appointment-table";
import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";


export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-black">
    <Header/>
    <Navigation/>
      <div className="pt-10">

      <AppointmentTable />
      </div>

    </div>
  )
}

