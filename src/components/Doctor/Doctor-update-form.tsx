import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Loader, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import useUpdateDoctorDetails from "@/hooks/DoctorHooks/useUpdateDoctorDetails";
import { DoctorAdditionalDetails, DoctorDetailsTabProps, FormFieldProps } from "@/types/DoctorTypes";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";



const DoctorDetailsTab: React.FC<DoctorDetailsTabProps> = ({ doctorData, doctorLoading }) => {
  const currentUser = useSelector(selectCurrentUser);
  const { handleUpdateDoctorDetails, isUpdatingDetails } = useUpdateDoctorDetails();
  const [editingDoctor, setEditingDoctor] = useState(false);
  const [doctorForm, setDoctorForm] = useState<DoctorAdditionalDetails>({
    doctorId: "",
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
  });

  useEffect(() => {
    if (doctorData && doctorForm.bio === "") {
      setDoctorForm(doctorData.doctorDetails.details);
    }
  }, [doctorData, doctorForm.bio]);

  const handleSave = () => {
    if (!currentUser?._id) return;

    handleUpdateDoctorDetails({
      ...doctorForm,
      doctorId: currentUser._id,
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
          <Button
            className="bg-indigo-400"
            onClick={() => setEditingDoctor(true)} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="default" size="sm">
              {isUpdatingDetails ? <Loader className="animate-spin" size={15} /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
            <Button
              className="bg-red-400"
              onClick={() => setEditingDoctor(false)} variant="outline" size="sm">
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
              <div>
                <Label htmlFor="gender" className="text-gray-300">
                  Gender
                </Label>
                <Select
                  disabled={!editingDoctor}
                  value={doctorForm.gender}
                  onValueChange={(value) => setDoctorForm({ ...doctorForm, gender: value })}
                >
                  <SelectTrigger id="gender" className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormField
                id="professionalTitle"
                label="Professional Title"
                type="text"
                value={doctorForm.professionalTitle}
                onChange={(e) => setDoctorForm({ ...doctorForm, professionalTitle: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="primarySpecialty"
                label="Primary Specialty"
                type="text"
                value={doctorForm.primarySpecialty}
                onChange={(e) => setDoctorForm({ ...doctorForm, primarySpecialty: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="experience"
                label="Years of Experience"
                type="text"
                value={doctorForm.experience}
                onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="consultationFees"
                label="Consultation Fees"
                type="text"
                value={doctorForm.consultationFees}
                onChange={(e) => setDoctorForm({ ...doctorForm, consultationFees: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="medicalLicenseNumber"
                label="Medical License Number"
                type="text"
                value={doctorForm.medicalLicenseNumber}
                onChange={(e) => setDoctorForm({ ...doctorForm, medicalLicenseNumber: e.target.value })}
                disabled={!editingDoctor}
              />
            </div>

            <div className="space-y-4">
              <FormField
                id="contactPhoneNumber"
                label="Contact Phone Number"
                type="text"
                value={doctorForm.contactPhoneNumber}
                onChange={(e) => setDoctorForm({ ...doctorForm, contactPhoneNumber: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="professionalEmail"
                label="Professional Email"
                type="email"
                value={doctorForm.professionalEmail}
                onChange={(e) => setDoctorForm({ ...doctorForm, professionalEmail: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="officeAddress"
                label="Office Address"
                type="text"
                value={doctorForm.officeAddress}
                onChange={(e) => setDoctorForm({ ...doctorForm, officeAddress: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="clinicLocations"
                label="Clinic Locations"
                type="text"
                value={doctorForm.clinicLocations}
                onChange={(e) => setDoctorForm({ ...doctorForm, clinicLocations: e.target.value })}
                disabled={!editingDoctor}
              />

              <FormField
                id="consultationLanguages"
                label="Consultation Languages"
                type="text"
                value={doctorForm.consultationLanguages}
                onChange={(e) => setDoctorForm({ ...doctorForm, consultationLanguages: e.target.value })}
                disabled={!editingDoctor}
              />

              <div>
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={doctorForm.bio}
                  onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                  disabled={!editingDoctor}
                  className="bg-zinc-800 border-zinc-700 text-white h-24 mt-2"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


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