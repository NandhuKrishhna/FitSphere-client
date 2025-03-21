import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slice/Auth_Slice";
import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useGetUserHealthDetailsQuery, 
  useGetWeightProgressQuery 
} from "@/redux/api/caloriesApi";
import ProfileHeader from "@/components/App/ProfileHeader";
import OverviewTab from "@/components/App/ProfileOverviewTab";
import SecurityTab from "@/components/App/SecurityTab";
import UserHealthDetailsTab from "@/components/App/UserHealthTab";

const UserProfilePage: React.FC = () => {
  const auth = useSelector(selectCurrentUser);
  
  // Queries
  const { data: healthData, isLoading: healthLoading } = useGetUserHealthDetailsQuery({});
  const { data: weightData, isLoading: weightLoading } = useGetWeightProgressQuery({});

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <ProfileHeader 
          name={auth?.name}
          email={auth?.email}
          profilePicture={auth?.profilePicture}
        />

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
            />
          </TabsContent>

          <TabsContent value="health">
            <UserHealthDetailsTab 
              healthData={healthData}
              healthLoading={healthLoading}
            />
          </TabsContent>
          
          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;