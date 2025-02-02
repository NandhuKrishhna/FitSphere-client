import BodyComposition from "../../components/LandingPage/BodyComposition"
import DoctorCarousel from "../../components/LandingPage/DoctorCarousel"
import DoctorRecruitment from "../../components/LandingPage/DoctorRecruitment"
import Footer from "../../components/LandingPage/Footer"
import HeroSection from "../../components/LandingPage/HeroSection"
import ReviewSection from "../../components/LandingPage/ReviewSection"


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
