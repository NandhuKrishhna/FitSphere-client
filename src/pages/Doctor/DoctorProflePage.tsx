import { useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import DoctorProfile from "@/components/Doctor/doctor-profile"
import ReviewsRatings from "@/components/Doctor/reviews-ratings"
import TotalEarnings from "@/components/Doctor/total-earnings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SecurityTab from "@/components/App/SecurityTab"
import DoctorDetailsTab from "@/components/Doctor/Doctor-update-form"
import { useDoctorProfileQuery } from "@/redux/api/doctorApi"


export default function DoctorProfilePage() {
  const [selectedEarningsView, setSelectedEarningsView] = useState("Monthly")
  const user = useSelector(selectCurrentUser)
  const { data: doctorDetails, isLoading } = useDoctorProfileQuery({ doctorId: user?._id })

  return (
    <div className="min-h-screen bg-black to-purple-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-600 rounded-xl p-5">
            <ReviewsRatings id={user?._id} />
          </div>
          <div className="rounded-xl p-5 flex-grow">
            <TotalEarnings selectedView={selectedEarningsView} onViewChange={setSelectedEarningsView} />
          </div>
        </div>

        {/* Right Column - Profile and Edit Options */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
              <TabsTrigger value="change-password">Change Password</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="rounded-xl overflow-hidden">
                {doctorDetails && <DoctorProfile doctorDetails={doctorDetails} />}
              </div>
            </TabsContent>

            {/* Edit Profile Tab - Using UpdateDoctorProfile component with doctorDetails */}
            <TabsContent value="edit-profile">
              {doctorDetails && <DoctorDetailsTab doctorData={doctorDetails} doctorLoading={isLoading} />}
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="change-password">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}