import { useState } from "react"
import { useSelector } from "react-redux"
import { useAllDoctorDetailsQuery, useDoctorDetailsQuery } from "@/redux/api/doctorApi"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import DoctorProfile from "@/components/Doctor/doctor-profile"
import ReviewsRatings from "@/components/Doctor/reviews-ratings"
import TotalEarnings from "@/components/Doctor/total-earnings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Key, Save } from "lucide-react"

export default function DoctorProfilePage() {
  const [selectedEarningsView, setSelectedEarningsView] = useState("Monthly")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const user = useSelector(selectCurrentUser)
  const { data: doctorDetails, isLoading } = useDoctorDetailsQuery({ doctorId: user?._id })
  const { data: profileDetails } = useAllDoctorDetailsQuery({})

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    bio: "",
    consultationFee: "",
    email: "",
    phone: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useState(() => {
    if (doctorDetails) {
      setFormData({
        name: doctorDetails.name || "",
        specialization: doctorDetails.specialization || "",
        experience: doctorDetails.experience || "",
        bio: doctorDetails.bio || "",
        consultationFee: doctorDetails.consultationFee || "",
        email: doctorDetails.email || "",
        phone: doctorDetails.phone || "",
      })
    }
  }, [doctorDetails])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileUpdate = () => {
    // Implement API call to update profile
    console.log("Updating profile with:", formData)
    setIsEditingProfile(false)
    // After successful update, refresh doctor details
  }

  const handlePasswordUpdate = () => {
    // Implement API call to update password
    console.log("Updating password with:", passwordData)
    setIsChangingPassword(false)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="min-h-screen bg-black to-purple-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-600 rounded-xl p-5">
            <ReviewsRatings id={user?._id} />
          </div>
          <div className=" rounded-xl p-5 flex-grow">
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
              <div className=" rounded-xl overflow-hidden">
                {doctorDetails && <DoctorProfile doctorDetails={doctorDetails} />}
              </div>
            </TabsContent>

            {/* Edit Profile Tab */}
            <TabsContent value="edit-profile">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Edit Profile Details
                  </CardTitle>
                  <CardDescription>Update your professional information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, specialization: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consultationFee">Consultation Fee (INR)</Label>
                      <Input
                        id="consultationFee"
                        name="consultationFee"
                        type="number"
                        value={formData.consultationFee}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell patients about your qualifications, experience, and approach to care"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}
                    className="bg-indigo-400"
                    >
                    Cancel
                  </Button>
                  <Button onClick={handleProfileUpdate} className="bg-indigo-600 hover:bg-indigo-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="change-password">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Update your account password to maintain security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsChangingPassword(false)}
                       className="bg-indigo-400">
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePasswordUpdate}
                    className="bg-indigo-600 hover:bg-indigo-700"
                    disabled={
                      !passwordData.currentPassword ||
                      !passwordData.newPassword ||
                      passwordData.newPassword !== passwordData.confirmPassword
                    }
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

