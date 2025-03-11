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
              price="₹199"
              features={["Access to basic features", "10 messages per doctor"]}
            />
            <SubscriptionCard
              title="Premium"
              description="Most popular choice"
              price="₹499"
              features={["50 messages per doctor", "Priority support", "Basic analytics"]}
              highlight
            />
            <SubscriptionCard
              title="Enterprise"
              description="Advanced features for pros"
              price="₹999"
              features={["Unlimited messages per doctor", "Priority support", "Advanced analytics"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
//TODO admin adding Plans and features do it on 13-03-2025;
{
  /*
   - payment integration
   - chat message limit
    - transactions 
    - notification
    
  */
}
