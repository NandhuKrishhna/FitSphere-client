import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Loader, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import useUpdateDoctorDetails from "@/hooks/DoctorHooks/useUpdateDoctorDetails";

export interface DoctorDetailsResponse {
  success: boolean;
  message: string;
  doctorDetails: DoctorDetails;
}

export interface DoctorDetails {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  status: string;
  profilePicture: string;
  details: DoctorAdditionalDetails;
}

export interface DoctorAdditionalDetails {
  bio: string;
  experience: string;
  consultationFees: string;
  contactPhoneNumber: string;
  professionalEmail: string;
  officeAddress: string;
  clinicLocations: string;
  consultationLanguages: string;
  primarySpecialty: string;
  medicalLicenseNumber: string;
  gender: string;
  professionalTitle: string;
}

interface DoctorData {
  doctorDetails: DoctorDetails;
}

interface DoctorDetailsTabProps {
  doctorData?: DoctorData;
  doctorLoading: boolean;
}

const DoctorDetailsTab: React.FC<DoctorDetailsTabProps> = ({ doctorData, doctorLoading }) => {
  // console.log(doctorData)
  const { handleUpdateDoctorDetails, isUpdatingDetails } = useUpdateDoctorDetails();
  const [editingDoctor, setEditingDoctor] = useState(false);
  const [doctorForm, setDoctorForm] = useState<DoctorDetails>({
    _id: "",
    name: "",
    email: "",
    isActive: false,
    role: "",
    status: "",
    profilePicture: "",
    details: {
      bio: "",
      experience: "",
      consultationFees: "",
      contactPhoneNumber: "",
      professionalEmail: "",
      officeAddress: "",
      clinicLocations: "",
      consultationLanguages: "",
      primarySpecialty: "",
      medicalLicenseNumber: "",
      gender: "",
      professionalTitle: ""
    }
  });

  useEffect(() => {
    if (doctorData && doctorForm._id === "") {
      setDoctorForm(doctorData.doctorDetails);
    }
  }, [doctorData, doctorForm._id]);
  
  const handleSave = () => {
    setDoctorForm((prev) => {
      console.log("Updated doctorForm before API call:", prev);
      handleUpdateDoctorDetails(prev);
      return prev;
    });
    setEditingDoctor(false);
  };
  
  
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Doctor Details</CardTitle>
          <CardDescription className="text-gray-400">Update your professional information</CardDescription>
        </div>
        {!editingDoctor ? (
          <Button onClick={() => setEditingDoctor(true)} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="default" size="sm">
              {isUpdatingDetails ? <Loader className="animate-spin" size={15} /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
            <Button onClick={() => setEditingDoctor(false)} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {doctorLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                id="name"
                label="Name"
                type="text"
                value={doctorForm.name}
                onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="email"
                label="Email"
                type="email"
                value={doctorForm.email}
                onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                disabled={!editingDoctor}
              />

              <div>
                <Label htmlFor="gender" className="text-gray-300">
                  Gender
                </Label>
                <Select
                  disabled={!editingDoctor}
                  value={doctorForm.details.gender}
                  onValueChange={(value) => setDoctorForm({ 
                    ...doctorForm, 
                    details: { ...doctorForm.details, gender: value } 
                  })}
                >
                  <SelectTrigger id="gender" className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormField
                id="professionalTitle"
                label="Professional Title"
                type="text"
                value={doctorForm.details.professionalTitle}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, professionalTitle: e.target.value } 
                })}
                disabled={!editingDoctor}
              />

              <FormField
                id="primarySpecialty"
                label="Primary Specialty"
                type="text"
                value={doctorForm.details.primarySpecialty}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, primarySpecialty: e.target.value } 
                })}
                disabled={!editingDoctor}
              />

              <FormField
                id="experience"
                label="Years of Experience"
                type="text"
                value={doctorForm.details.experience}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, experience: e.target.value } 
                })}
                disabled={!editingDoctor}
              />
              
              <FormField
                id="consultationFees"
                label="Consultation Fees"
                type="text"
                value={doctorForm.details.consultationFees}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, consultationFees: e.target.value } 
                })}
                disabled={!editingDoctor}
              />
            </div>

            <div className="space-y-4">
              <FormField
                id="contactPhoneNumber"
                label="Contact Phone Number"
                type="text"
                value={doctorForm.details.contactPhoneNumber}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, contactPhoneNumber: e.target.value } 
                })}
                disabled={!editingDoctor}
              />

              <FormField
                id="professionalEmail"
                label="Professional Email"
                type="email"
                value={doctorForm.details.professionalEmail}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, professionalEmail: e.target.value } 
                })}
                disabled={!editingDoctor}
              />

              <FormField
                id="medicalLicenseNumber"
                label="Medical License Number"
                type="text"
                value={doctorForm.details.medicalLicenseNumber}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, medicalLicenseNumber: e.target.value } 
                })}
                disabled={!editingDoctor}
              />

              <FormField
                id="officeAddress"
                label="Office Address"
                type="text"
                value={doctorForm.details.officeAddress}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, officeAddress: e.target.value } 
                })}
                disabled={!editingDoctor}
              />

              <FormField
                id="clinicLocations"
                label="Clinic Locations"
                type="text"
                value={doctorForm.details.clinicLocations}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, clinicLocations: e.target.value } 
                })}
                disabled={!editingDoctor}
              />

              <FormField
                id="consultationLanguages"
                label="Consultation Languages"
                type="text"
                value={doctorForm.details.consultationLanguages}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, consultationLanguages: e.target.value } 
                })}
                disabled={!editingDoctor}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="bio" className="text-gray-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={doctorForm.details.bio}
                onChange={(e) => setDoctorForm({ 
                  ...doctorForm, 
                  details: { ...doctorForm.details, bio: e.target.value } 
                })}
                disabled={!editingDoctor}
                className="bg-zinc-800 border-zinc-700 text-white h-32 mt-2"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  step?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ id, label, type, value, onChange, disabled, step }) => {
  return (
    <div>
      <Label htmlFor={id} className="text-gray-300">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-zinc-800 border-zinc-700 text-white"
      />
    </div>
  );
};

export default DoctorDetailsTab;