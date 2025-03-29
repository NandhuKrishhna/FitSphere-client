import type React from "react"
import { useSelector } from "react-redux"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import { useGetUserHealthDetailsQuery, useGetWeightProgressQuery } from "@/redux/api/caloriesApi"
import { useGetSubscriptionDetailsQuery } from "@/redux/api/appApi"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import ProfileHeader from "@/components/App/ProfileHeader"
import OverviewTab from "@/components/App/ProfileOverviewTab"
import UserHealthDetailsTab from "@/components/App/UserHealthTab"
import SecurityTab from "@/components/App/SecurityTab"


const UserProfilePage: React.FC = () => {
  const auth = useSelector(selectCurrentUser)

  // Queries
  const { data: healthData, isLoading: healthLoading } = useGetUserHealthDetailsQuery({})
  const { data: weightData, isLoading: weightLoading } = useGetWeightProgressQuery({})
  const { data: subscriptionDetails, isLoading: subscriptionLoading } = useGetSubscriptionDetailsQuery({})

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <ProfileHeader name={auth?.name} email={auth?.email} profilePicture={auth?.profilePicture} />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-zinc-800 text-indigo-400">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health Details</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab
              auth={auth}
              healthData={healthData}
              healthLoading={healthLoading}
              weightData={weightData}
              weightLoading={weightLoading}
              subscriptionDetails={subscriptionDetails?.response}
              subscriptionLoading={subscriptionLoading}
            />
          </TabsContent>

          <TabsContent value="health">
            <UserHealthDetailsTab healthData={healthData} healthLoading={healthLoading} />
          </TabsContent>
          {/*
            //TODO : for users login from google dont show the security tab
           */}
          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserProfilePage

