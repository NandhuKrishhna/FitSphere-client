import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import SubscriptionCard from "@/components/App/SubcriptionCard"
import { useGetAllSubscriptionPlansQuery } from "@/redux/api/appApi"
import { SubscriptionPlan } from "../Admin/SubcriptionManagement"
import { usePurchaseSubscripiton } from "@/hooks/App/use-purchase-subscription"
import { useToast } from "@/components/ui/toast-container"


const SubscriptionPage = () => {
  const { data: subscriptions } = useGetAllSubscriptionPlansQuery({})
  const { handlePurchaseSubscription } = usePurchaseSubscripiton();
  const { addToast } = useToast()
  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `₹${price}`
  }

  const shouldHighlight = (type: string) => {
    return type === "premium"
  }

  const getDescription = (type: string) => {
    switch (type) {
      case "basic":
        return "Great for starters"
      case "premium":
        return "Most popular choice"
      case "enterprise":
        return "Advanced features for pros"
      default:
        return "Flexible plan options"
    }
  }
  const handleOnClickOnFreePlan = async () => {
    return addToast({
      type: "warning",
      message: "Already have a basic plan",
      title: "Notification"
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Navigation />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-indigo-300 max-w-2xl mx-auto">
              Select the perfect subscription plan that fits your needs and unlock premium features to enhance your
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptions?.response?.map((plan: SubscriptionPlan) => (
              <SubscriptionCard
                key={plan._id}
                title={plan.planName}
                description={getDescription(plan.type)}
                price={formatPrice(plan.price)}
                features={plan.features}
                highlight={shouldHighlight(plan.type)}
                onClick={plan.type === "basic" && plan.price === 0 ? () => handleOnClickOnFreePlan() : () => handlePurchaseSubscription(plan._id)}
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage

