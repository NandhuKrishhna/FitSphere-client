import { useState } from "react";
import { z } from "zod";
import type React from "react";
import { useRegisterAsDoctorMutation } from "../../redux/api/doctorApi";
import { professionalSchema } from "../../types/Validations/registerAsDoctorForm";
import RegistrationSuccessPopup from "../../components/RegistrationSuccessPop";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

type ProfessionalDetails = z.infer<typeof professionalSchema>;

export default function ProfessionalDetailsForm() {
  const [selectedImg, setSelectedImg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ProfessionalDetails>({
    experience: "0",
    consultationFees: "0",
    contactPhoneNumber: "",
    professionalEmail: "",
    officeAddress: "",
    clinicLocations: "",
    consultationLanguages: "",
    primarySpecialty: "",
    medicalLicenseNumber: "",
    gender: "Male",
    professionalTitle: "",
    bio: "",
    certificate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    try {
      const field = z.object({
        [name]: professionalSchema.shape[name as keyof ProfessionalDetails],
      });
      field.parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const [registerAsDoctor, { isLoading }] = useRegisterAsDoctorMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`, {
        position: "top-right",
        duration: 4000,
      });
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      setFormData((prev) => ({ ...prev, certificate: base64Image }));
      toast.success("Certificate image uploaded successfully!", {
        position: "top-right",
        duration: 3000,
      });
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      professionalSchema.parse(formData);
      const userId = localStorage.getItem("userId");
      const doctorInfo = JSON.parse(localStorage.getItem("doctorInfo") || "{}");
      await registerAsDoctor({ formData, userId, doctorInfo }).unwrap();
      setShowSuccess(true);
    } catch (error) {
      console.error("Submission failed:", error);
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-500 to-black">
      <div className="min-h-screen max-w-screen-lg mx-auto   text-gray-500 flex items-center justify-center relative overflow-hidden">
        <div className="max-w-5xl w-full bg-[#121212] rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Professional Details</h1>
          <p className="text-gray-400 mb-8">
            Fill in your medical professional information. All fields are required. Once you submit the form, the admin
            will review and approve your details before they are finalized.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Experience (Years)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter years of experience"
                    />
                  </div>
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Consultation Fees</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="consultationFees"
                      value={formData.consultationFees}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter consultation fees"
                    />
                  </div>
                  {errors.consultationFees && <p className="text-red-500 text-sm mt-1">{errors.consultationFees}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Contact Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="contactPhoneNumber"
                      value={formData.contactPhoneNumber}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.contactPhoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactPhoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Professional Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="professionalEmail"
                      value={formData.professionalEmail}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter professional email"
                    />
                  </div>
                  {errors.professionalEmail && <p className="text-red-500 text-sm mt-1">{errors.professionalEmail}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Medical LicenseNumber</label>
                  <div className="relative">
                    <input
                      type="medicalLicenseNumber"
                      name="medicalLicenseNumber"
                      value={formData.medicalLicenseNumber}
                      onChange={handleInputChange}
                      className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter Medical LicenseNumber"
                    />
                  </div>
                  {errors.medicalLicenseNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.medicalLicenseNumber}</p>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Office Address</label>
                  <textarea
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter office address"
                  />
                  {errors.officeAddress && <p className="text-red-500 text-sm mt-1">{errors.officeAddress}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Clinic Locations</label>
                  <input
                    type="text"
                    name="clinicLocations"
                    value={formData.clinicLocations}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Clinic Locations"
                  />
                  {errors.clinicLocations && <p className="text-red-500 text-sm mt-1">{errors.clinicLocations}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Primary Specialty</label>
                  <input
                    type="text"
                    name="primarySpecialty"
                    value={formData.primarySpecialty}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter primary specialty"
                  />
                  {errors.primarySpecialty && <p className="text-red-500 text-sm mt-1">{errors.primarySpecialty}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Consultation Languages</label>
                  <select
                    name="consultationLanguages"
                    value={formData.consultationLanguages}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select a language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.consultationLanguages && (
                    <p className="text-red-500 text-sm mt-1">{errors.consultationLanguages}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Professional Title</label>
                <input
                  type="text"
                  name="professionalTitle"
                  value={formData.professionalTitle}
                  onChange={handleInputChange}
                  className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter professional title"
                />
                {errors.professionalTitle && <p className="text-red-500 text-sm mt-1">{errors.professionalTitle}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-[#1C1C1C] text-gray-100 rounded-lg border border-gray-800 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter your bio"
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>
            </div>
            {/*  Image uploaded */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Certificates</label>
              <div className="bg-[#1c1c1c] w-48 h-48 rounded-md relative flex items-center justify-center overflow-hidden">
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  id="certificateUpload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {/* Display Selected Image */}
                {selectedImg ? (
                  <img src={selectedImg} alt="Selected Certificate" className="absolute w-full h-full object-cover" />
                ) : (
                  <p className="text-gray-500 text-sm">No Image</p>
                )}
                {/* Clickable Label for File Input */}
                <label
                  htmlFor="certificateUpload"
                  className="bg-indigo-400 w-10 h-10 rounded-full flex 
           hover:bg-indigo-600 hover:scale-110 transition-transform 
           duration-200 items-center justify-center 
           absolute bottom-1 right-1 p-2 cursor-pointer"
                >
                  <Camera className="text-black w-6 h-6" />
                </label>
              </div>
              <p>Click the camera icon to upload your certificates</p>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#121212] transition-colors"
            >
              {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Need help? <p className="text-indigo-500 hover:text-indigo-400">Contact Support</p>
          </p>
        </div>
        <RegistrationSuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      </div>
    </div>
  );
}
