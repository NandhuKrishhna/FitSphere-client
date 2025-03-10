import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import SubscriptionCard from "@/components/App/SubcriptionCard";

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <Navigation />
      <div className=" py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select the perfect subscription plan that fits your needs and unlock premium features to enhance your
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <SubscriptionCard
              title="Basic"
              description="Great for starters"
              price="$9"
              features={["Access to basic features", "1 user account", "5GB storage", "Email support"]}
            />
            <SubscriptionCard
              title="Premium"
              description="Most popular choice"
              price="$29"
              features={[
                "All Basic features",
                "5 user accounts",
                "50GB storage",
                "Priority support",
                "Advanced analytics",
              ]}
              highlight
            />
            <SubscriptionCard
              title="Enterprise"
              description="For large teams"
              price="$99"
              features={[
                "All Premium features",
                "Unlimited users",
                "500GB storage",
                "24/7 dedicated support",
                "Custom integrations",
                "White-label solutions",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
