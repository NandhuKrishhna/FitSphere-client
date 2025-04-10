import React from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { OverviewTabProps } from "@/types/types";
import WeightProgressChart from "./WeightProgressChart";
import ProfileInfoCard from "./ProfileInfoCard";
import HealthSummaryCard from "./HealthSummaryCard";
import SubscriptionDetailsSkeleton from "../skeleton/SubscriptionDetailsSkeleton";


const OverviewTab: React.FC<OverviewTabProps> = ({
  auth,
  healthData,
  healthLoading,
  weightData,
  weightLoading,
  subscriptionDetails,
  subscriptionLoading = false,
}) => {
  const formattedWeightData = weightData?.weightProgress?.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weight: entry.weight,
  })) || [];
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Button
        onClick={() => navigate('/subscription')}
      >
        Manage Subscription
      </Button>
      <Button
        onClick={() => navigate('/transactions')}
      >
        Transactions
      </Button>
      {subscriptionDetails && (
        <div className="col-span-1 md:col-span-2">
          {subscriptionLoading
            ? <SubscriptionDetailsSkeleton />
            : <SubscriptionDetails subscriptionDetails={subscriptionDetails} isLoading={subscriptionLoading} />
          }
        </div>
      )}
      <WeightProgressChart
        weightLoading={weightLoading}
        formattedWeightData={formattedWeightData}
      />
      <ProfileInfoCard auth={auth} healthData={healthData} />
      <HealthSummaryCard healthData={healthData} healthLoading={healthLoading} />
    </div>
  );
};



export default OverviewTab;