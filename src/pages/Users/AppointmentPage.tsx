import AppointmentTable from "@/components/App/Appointment-table";
import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useSelector } from "react-redux";


export default function AppointmentPage() {
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

      <AppointmentTable />
      </div>

    </div>
  )
}

