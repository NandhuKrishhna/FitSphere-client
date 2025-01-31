import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  image: string;
}

const doctors = [
  {
    id: 1,
    name: "Dr. Rajeev",
    specialty: "MD — Fitness & Health Specialist",
    rating: "5.0/5.0",
    image: "https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737140633/Pngtree_young_afro_professional_doctor_13227671_uwbhey.png",
  },
  {
    id: 2,
    name: "Dr. Rajeev",
    specialty: "MD — Fitness & Health Specialist",
    rating: "5.0/5.0",
    image: "https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737140482/pngtree-male-doctor-photo-png-image_11755264_yvrltf.png",
  },
  {
    id: 3,
    name: "Dr. Rajeev",
    specialty: "MD — Fitness & Health Specialist",
    rating: "5.0/5.0",
    image: "https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737140482/pngtree-male-physician-doctor-png-image_10167965_mbxbll.png",
  },
  {
    id: 4,
    name: "Dr. Neha Sharma",
    specialty: "MBBS, DGO — Obstetrics ",
    rating: "4.8/5.0",
    image: "https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737141143/pngtree-female-doctor-image-png-image_12725828_w9e9zp.png",
  },
  {
    id: 5,
    name: "Dr. Karan Mehta",
    specialty: "MD — Cardiology Specialist",
    rating: "4.9/5.0",
    image: "https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737141143/pngtree-professional-doctor-with-order-png-image_11626748_wjrw1i.png",
  },
  {
    id: 6,
    name: "Dr. Priya Verma",
    specialty: "MS — Orthopedic Surgeon",
    rating: "4.7/5.0",
    image: "https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737141144/pngtree-indian-doctor-woman-smiling-at-camera-png-image_12531120_d8ynhh.png",
  },
];

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-[280px] bg-black rounded-3xl overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={doctor.image || "/placeholder.svg"}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-white">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{doctor.name}</h3>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
        <p className="text-sm text-gray-300">{doctor.specialty}</p>
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => {
              navigate("/login"); 
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
          >
            Book
          </button>
          <span className="text-sm">{doctor.rating}</span>
        </div>
      </div>
    </div>
  );
};


const DoctorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + doctors.length) % doctors.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative py-8">
        {/* Mobile View (Single Card) */}
        <div className="md:hidden relative">
          <DoctorCard doctor={doctors[currentIndex]} />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-lg"
              aria-label="Previous doctor"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-lg"
              aria-label="Next doctor"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Desktop View (Multiple Cards - Show 4 Cards) */}
        <div className="hidden md:block">
          <div className="flex gap-6 items-center justify-center">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 4 }).map((_, offset) => {
                const index = (currentIndex + offset) % doctors.length;
                return <DoctorCard key={doctors[index].id} doctor={doctors[index]} />;
              })}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {doctors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-purple-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCarousel;
