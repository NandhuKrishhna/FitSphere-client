import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { menuItems } from "@/utils/UserDoctorDetails";
import { MenuItem, DoctorDetails, Review } from "@/types/DoctorDetail";
import ReviewsList from "./ReviewsList";

type InfoTabsProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  doctorDetails: DoctorDetails;
  reviews: Review[];
  renderTabContent: boolean;
};

const InfoTabs: React.FC<InfoTabsProps> = ({
  activeSection,
  setActiveSection,
  doctorDetails,
  reviews,
  renderTabContent,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const getContent = (): React.ReactNode => {
    switch (activeSection) {
      case "about":
        return <p>{doctorDetails?.details?.bio || "No bio available."}</p>;
      case "experience":
        return <p>{doctorDetails?.details?.experience} years of experience</p>;
      case "consultation":
        return (
          <>
            <p>Consultation Fee: ${doctorDetails?.details?.consultationFees}</p>
            <p>Languages: {doctorDetails?.details?.consultationLanguages}</p>
          </>
        );
      case "reviews":
        return <ReviewsList reviews={reviews} />;
      default:
        return <p>Content for {activeSection} section</p>;
    }
  };

  return (
    <>
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg"
        >
          <span className="font-medium">{menuItems.find((item) => item.id === activeSection)?.label || "About"}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
        </button>

        {mobileMenuOpen && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg mt-2 overflow-hidden">
            {menuItems.map((item: MenuItem) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  activeSection === item.id ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block w-64 space-y-2">
        {menuItems.map((item: MenuItem) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === item.id ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {renderTabContent && <div className="flex-1 bg-gray-800/50 rounded-lg p-6">{getContent()}</div>}
    </>
  );
};

export default InfoTabs;
