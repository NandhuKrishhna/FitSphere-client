
import { HeartPulse } from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import Button from './Button'

export default function DoctorRecruitment() {
  const navigate = useNavigate()
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-8 lg:p-12">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:leading-[1.2]">
              Guided by Expertise, 
              <span className="block">Driven by Care —</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <p className="text-lg font-medium text-muted-foreground sm:text-xl">
              Our Doctors Are Here to Empower Your Fitness Journey.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Are you a doctor?</h2>
            <p className="text-lg text-muted-foreground">
              Join us and start working on your terms —
              <span className="block">make a difference, earn, and grow with FitSphere.</span>
            </p>
          </div>
          <Button 
            onClick={()=>{navigate('/doctor-register')}}
            size="lg"
            className="w-fit bg-[#8B7EF8] hover:bg-[#7A6AF6] text-white px-8"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}

