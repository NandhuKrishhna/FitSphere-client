import BodyComposition from "../../components/BodyComposition"
import DoctorCarousel from "../../components/DoctorCarousel"
import DoctorRecruitment from "../../components/DoctorRecruitment"
import Footer from "../../components/Footer"
import HeroSection from "../../components/HeroSection"
import ReviewSection from "../../components/ReviewSection"
const LandingPage = () => {
  return (
    <div>
      <HeroSection/>
      <ReviewSection/>
      <BodyComposition/>
      <DoctorCarousel/>
      <DoctorRecruitment/>
      <Footer/>
    </div>
  )
}

export default LandingPage
