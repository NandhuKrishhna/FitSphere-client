import { useNavigate } from "react-router-dom";

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Button } from "../ui/button";

export default function HeroSection() {
  const navigate = useNavigate()
  return (
    <div className="relative  min-h-screen w-full bg-black">
      <div
        className="absolute inset-0 max-w-[800px]:hidden"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dzsdfw5vx/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1737108303/pexels-kseniya-budko-58499146-7952548_m1k3wz.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />


      <div className="relative z-10 flex min-h-screen items-center justify-between px-6 md:px-12 text-white">

        <div className="max-w-2xl">

          <div className="mb-6 flex items-center gap-2">
            <span className="text-xl font-semibold text-white">FitSphere</span>
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            FitSphere&apos;s <br />Smart Scale <br />Technology
          </h1>

          <p className="mb-8 text-lg text-white">
            It&apos;s about understanding your body composition in depth and tracking progress with precision.
          </p>

          <Button
            onClick={() => { navigate('/login') }}
            size="lg"
            className="w-fit text-xl bg-[#8B7EF8] hover:bg-[#7A6AF6] text-white px-8"
          >
            Login
          </Button>

          <div className="mt-12 flex items-center gap-4">
            <a href="#" className="text-white hover:text-blue-300 transition-colors">
              <FaFacebook className="h-6 w-6" />
            </a>


            <a href="#" className="text-white hover:text-blue-300 transition-colors">
              <FaInstagram className="h-6 w-6" />
            </a>

            <a href="#" className="text-white hover:text-blue-300 transition-colors">
              <FaTwitter className="h-6 w-6" />
            </a>

            <a href="#" className="text-white hover:text-blue-300 transition-colors">
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="hidden md:block max-w-[800px]:hidden">
          <div className="relative h-[600px] w-[300px]">
            <img
              src="https://res.cloudinary.com/dzsdfw5vx/image/upload/v1743947184/Screenshot_2025-04-06_191409-Photoroom_vsfbt7.png"
              alt="FitSphere App Interface"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

