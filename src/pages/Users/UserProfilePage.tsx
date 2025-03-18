"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { Camera, Edit, Lock, Save, X } from "lucide-react"
import {
  useUploadProfilePicMutation
} from "../../redux/api/appApi"
import toast from "react-hot-toast"
import { useState } from "react"
import { selectCurrentUser, setProfilePicture } from "../../redux/slice/Auth_Slice"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useGetUserHealthDetailsQuery, useGetWeightProgressQuery } from "@/redux/api/caloriesApi"

const UserProfilePage = () => {
  const auth = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  // Queries
  const { data: healthData, isLoading: healthLoading } = useGetUserHealthDetailsQuery({})
  const { data: weightData, isLoading: weightLoading } = useGetWeightProgressQuery({})
  const [uploadProfilePic, { isLoading: uploadLoading }] = useUploadProfilePicMutation()

  // States
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const [editingHealth, setEditingHealth] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [healthForm, setHealthForm] = useState({
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    activityLevel: "",
    goal: "",
    targetWeight: 0,
    weeksToGoal: 0,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })


  const formattedWeightData =
    weightData?.weightProgress?.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weight: entry.weight,
    })) || []


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result as string
      setSelectedImg(base64Image)
      try {
        const response = await uploadProfilePic({ profilePic: base64Image }).unwrap()
        dispatch(setProfilePicture(response.profilePicture))
        toast.success("Profile picture updated successfully!")
      } catch (error: any) {
        console.error("Profile update error:", error)
        toast.error(error?.data?.message || "Failed to update profile")
      }
    }
  }

  if (healthData && healthForm.age === 0) {
    setHealthForm({
      age: healthData.userHealthDetails.age,
      gender: healthData.userHealthDetails.gender,
      height: healthData.userHealthDetails.height,
      weight: healthData.userHealthDetails.weight,
      activityLevel: healthData.userHealthDetails.activityLevel,
      goal: healthData.userHealthDetails.goal,
      targetWeight: healthData.userHealthDetails.targetWeight,
      weeksToGoal: healthData.userHealthDetails.weeksToGoal,
    })
  }


  const handleHealthUpdate = () => {
    toast.success("Health details updated successfully!")
    setEditingHealth(false)
  }

  const handlePasswordUpdate = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    toast.success("Password updated successfully!")
    setEditingPassword(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={selectedImg || auth?.profilePicture || "/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-indigo-600 hover:bg-indigo-700
                p-2 rounded-full cursor-pointer 
                transition-all duration-200 shadow-md
                ${uploadLoading ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadLoading}
              />
            </label>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">{auth?.name || "Richard Davis"}</h1>
          <p className="text-indigo-300">{auth?.email || "user@example.com"}</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-zinc-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health Details</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>


          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight Progress Chart */}
              <Card className="col-span-1 md:col-span-2 bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Weight Progress</CardTitle>
                  <CardDescription className="text-gray-400">Track your weight changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {weightLoading ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : formattedWeightData.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formattedWeightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="date" stroke="#aaa" />
                          <YAxis
                            domain={[
                              Math.floor(Math.min(...formattedWeightData.map((d) => d.weight)) - 1),
                              Math.ceil(Math.max(...formattedWeightData.map((d) => d.weight)) + 1),
                            ]}
                            stroke="#aaa"
                          />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#222", border: "1px solid #444" }}
                            labelStyle={{ color: "#fff" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={{ r: 6, fill: "#8884d8", strokeWidth: 2 }}
                            activeDot={{ r: 8, fill: "#222", stroke: "#8884d8" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">No weight data available</div>
                  )}
                </CardContent>
              </Card>


              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Full Name:</p>
                      <p className="font-medium text-white">{auth?.name || "User Name"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email:</p>
                      <p className="font-medium text-white">{auth?.email || "user@example.com"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Age:</p>
                      <p className="font-medium text-white">{healthData?.userHealthDetails?.age || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Gender:</p>
                      <p className="font-medium text-white capitalize">
                        {healthData?.userHealthDetails?.gender || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

      
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Health Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {healthLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : healthData ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Current Weight:</p>
                        <p className="font-medium text-white">{healthData.userHealthDetails.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Target Weight:</p>
                        <p className="font-medium text-white">{healthData.userHealthDetails.targetWeight} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Height:</p>
                        <p className="font-medium text-white">{healthData.userHealthDetails.height} cm</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Goal:</p>
                        <p className="font-medium text-white capitalize">{healthData.userHealthDetails.goal}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Activity Level:</p>
                        <p className="font-medium text-white capitalize">
                          {healthData.userHealthDetails.activityLevel}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Daily Calories:</p>
                        <p className="font-medium text-white">
                          {healthData.userHealthDetails.targetDailyCalories} kcal
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">No health data available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

  
          <TabsContent value="health">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Health Details</CardTitle>
                  <CardDescription className="text-gray-400">Update your health information</CardDescription>
                </div>
                {!editingHealth ? (
                  <Button onClick={() => setEditingHealth(true)} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleHealthUpdate} variant="default" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={() => setEditingHealth(false)} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {healthLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="age" className="text-gray-300">
                          Age
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          value={healthForm.age}
                          onChange={(e) => setHealthForm({ ...healthForm, age: Number.parseInt(e.target.value) })}
                          disabled={!editingHealth}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="gender" className="text-gray-300">
                          Gender
                        </Label>
                        <Select
                          disabled={!editingHealth}
                          value={healthForm.gender}
                          onValueChange={(value) => setHealthForm({ ...healthForm, gender: value })}
                        >
                          <SelectTrigger id="gender" className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="height" className="text-gray-300">
                          Height (cm)
                        </Label>
                        <Input
                          id="height"
                          type="number"
                          value={healthForm.height}
                          onChange={(e) => setHealthForm({ ...healthForm, height: Number.parseInt(e.target.value) })}
                          disabled={!editingHealth}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weight" className="text-gray-300">
                          Current Weight (kg)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          value={healthForm.weight}
                          onChange={(e) => setHealthForm({ ...healthForm, weight: Number.parseFloat(e.target.value) })}
                          disabled={!editingHealth}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="activityLevel" className="text-gray-300">
                          Activity Level
                        </Label>
                        <Select
                          disabled={!editingHealth}
                          value={healthForm.activityLevel}
                          onValueChange={(value) => setHealthForm({ ...healthForm, activityLevel: value })}
                        >
                          <SelectTrigger id="activityLevel" className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectItem value="sedentary">Sedentary</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="very_active">Very Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="goal" className="text-gray-300">
                          Goal
                        </Label>
                        <Select
                          disabled={!editingHealth}
                          value={healthForm.goal}
                          onValueChange={(value) => setHealthForm({ ...healthForm, goal: value })}
                        >
                          <SelectTrigger id="goal" className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectItem value="lose">Lose Weight</SelectItem>
                            <SelectItem value="maintain">Maintain Weight</SelectItem>
                            <SelectItem value="gain">Gain Weight</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="targetWeight" className="text-gray-300">
                          Target Weight (kg)
                        </Label>
                        <Input
                          id="targetWeight"
                          type="number"
                          step="0.1"
                          value={healthForm.targetWeight}
                          onChange={(e) =>
                            setHealthForm({ ...healthForm, targetWeight: Number.parseFloat(e.target.value) })
                          }
                          disabled={!editingHealth}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weeksToGoal" className="text-gray-300">
                          Weeks to Goal
                        </Label>
                        <Input
                          id="weeksToGoal"
                          type="number"
                          value={healthForm.weeksToGoal}
                          onChange={(e) =>
                            setHealthForm({ ...healthForm, weeksToGoal: Number.parseInt(e.target.value) })
                          }
                          disabled={!editingHealth}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Password Update</CardTitle>
                <CardDescription className="text-gray-400">Change your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-gray-300">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword" className="text-gray-300">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-300">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>

                  <Button
                    onClick={handlePasswordUpdate}
                    disabled={
                      !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword
                    }
                    className="w-full"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserProfilePage

