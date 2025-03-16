import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { menuItems } from "@/utils/UserDoctorDetails"
import type { MenuItem, DoctorDetails, Review } from "@/types/DoctorDetail"
import ReviewsList from "./ReviewsList"
import ReviewModal from "./ReviewModal"
import useAddReview from "@/hooks/App/useAddReviews"

type InfoTabsProps = {
  activeSection: string
  setActiveSection: (section: string) => void
  doctorDetails: DoctorDetails
  reviews: Review[]
  renderTabContent: boolean
  doctorName: string
}

const InfoTabs: React.FC<InfoTabsProps> = ({
  activeSection,
  setActiveSection,
  doctorDetails,
  reviews,
  renderTabContent,
  doctorName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false)
  const { handleAddReview, isAddReview } = useAddReview()

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true)
  }

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false)
  }

  const handleSubmitReview = (rating: number, reviewText: string) => {
    if (doctorDetails._id) {
      handleAddReview({
        doctorId: doctorDetails._id,
        rating,
        reviewText
      })
      handleCloseReviewModal()
    }
  }

  const getContent = (): React.ReactNode => {
    switch (activeSection) {
      case "about":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">About Dr. {doctorDetails.name}</h3>
            <p className="text-gray-300 leading-relaxed">{doctorDetails?.details?.bio || "No bio available."}</p>
          </div>
        )
      case "experience":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Professional Experience</h3>
            <p className="text-gray-300 leading-relaxed">
              {doctorDetails?.details?.experience} years of experience in {doctorDetails?.details?.primarySpecialty}
            </p>
          </div>
        )
      case "consultation":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Consultation Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Consultation Fee</p>
                <p className="text-white text-lg font-medium">{doctorDetails?.details?.consultationFees}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Languages</p>
                <p className="text-white text-lg font-medium">{doctorDetails?.details?.consultationLanguages}</p>
              </div>
            </div>
          </div>
        )
      case "reviews":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Patient Reviews</h3>
              <button
                onClick={handleOpenReviewModal}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors"
              >
                Add Review
              </button>
            </div>
            <ReviewsList reviews={reviews} doctorName={doctorName}/>
          </div>
        )
      default:
        return <p>Content for {activeSection} section</p>
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
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
                  setActiveSection(item.id)
                  setMobileMenuOpen(false)
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

      <div className="hidden md:flex flex-col space-y-2 w-64">
        {menuItems.map((item: MenuItem) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-5 py-3.5 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-800/70 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {renderTabContent && (
        <div className="flex-1 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 shadow-lg">
          {getContent()}
        </div>
      )}

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        existingReview={null}
        doctorName={doctorName}
        isLoading={isAddReview}
        onSubmit={handleSubmitReview}
      />
    </div>
  )
}

export default InfoTabs