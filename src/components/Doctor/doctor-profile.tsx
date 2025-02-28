import { Phone, Mail, MessageSquare } from "lucide-react";

export default function DoctorProfile() {
  return (
    <div className="flex flex-col h-full">
      {/* Doctor image */}
      <div className="bg-white p-4 rounded-t-xl">
        <img
          src="/placeholder.svg?height=300&width=300"
          alt="Doctor profile"
          className="w-full h-auto object-cover rounded"
        />
      </div>

      {/* Doctor info */}
      <div className="flex-grow bg-black text-white p-4">
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-bold">Sarah Johnson</h1>
            <p className="text-gray-300">Cardiologist</p>
          </div>

          <div className="bg-gray-800 inline-block px-2 py-1 rounded text-xs">About</div>

          <p className="text-xs text-gray-300">
            I am Dr. Sarah Johnson, a dedicated and experienced Cardiologist with over 15 years of experience in
            diagnosing and treating various cardiovascular conditions. My passion lies in helping patients lead
            healthier lives by focusing on preventive care, accurate diagnoses, and targeted treatments.
          </p>

          <div className="space-y-1 pt-2">
            <p className="text-xs">
              <span className="font-bold">Education:</span> I completed my Doctor of Medicine (MD) at Harvard Medical
              School and pursued a Fellowship in Cardiology at the Mayo Clinic, where I honed my skills in managing
              complex cardiac cases.
            </p>
          </div>

          <div className="space-y-1 pt-2">
            <p className="text-xs font-bold">Areas of Expertise:</p>
            <ul className="text-xs list-disc pl-5 space-y-1">
              <li>Coronary heart disease and heart disease</li>
              <li>Cardiac risk assessment and prevention</li>
              <li>Treatment of arrhythmias and heart failure</li>
              <li>Lifestyle counseling for heart health</li>
              <li>Echocardiography</li>
            </ul>
          </div>

          <p className="text-xs text-gray-300 pt-2">
            I believe in a respectful and patient-centered approach and work diligently to help patients understand
            their heart health. My goal is to provide compassionate care and foster long-term wellness for every
            individual I work with.
          </p>

          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-xs">sarah.johnson@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-xs">+1-555-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-xs">Message Dr. Johnson</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
