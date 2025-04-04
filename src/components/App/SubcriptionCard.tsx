import { SubscriptionCardProps } from "@/types/types";
import { CheckIcon } from "lucide-react";


const SubscriptionCard = ({ title, description, price, features, highlight, onClick }: SubscriptionCardProps) => {
  return (
    <div
      className={`rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${highlight ? "bg-indigo-900 shadow-2xl" : "bg-gray-900"
        }`}
    >
      {highlight && (
        <div className="absolute top-0 right-0">
          <div className="bg-indigo-500 text-xs font-bold uppercase py-1 px-3 rounded-bl-lg">Popular</div>
        </div>
      )}
      <div className={`p-6 border-b ${highlight ? "border-indigo-800" : "border-gray-800"}`}>
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className={`text-sm mb-4 ${highlight ? "text-indigo-200" : "text-gray-400"}`}>{description}</p>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className={highlight ? "text-indigo-200 ml-1" : "text-gray-400 ml-1"}>/month</span>
        </div>
        <button

          className={`w-full py-2 px-4 rounded-lg transition-colors ${highlight ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          onClick={onClick}
        >
          Get Started
        </button>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon
                className={`h-5 w-5 flex-shrink-0 mt-0.5 ${highlight ? "text-indigo-300" : "text-indigo-500"} mr-2`}
              />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionCard;
