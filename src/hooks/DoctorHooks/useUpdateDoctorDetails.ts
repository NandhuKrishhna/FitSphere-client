import { useUpdateDoctorDetailsMutation } from "@/redux/api/doctorApi";
import { DoctorDetailsParams } from "@/types/doctorDetails";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

const useUpdateDoctorDetails = () => {
    const [updateDoctorDetails , {isLoading : isUpdatingDetails}] = useUpdateDoctorDetailsMutation();
    const handleUpdateDoctorDetails = async (data : DoctorDetailsParams) => {
        try {
            const response = await updateDoctorDetails(data).unwrap();
            toast.success(response.message);
        } catch (error) {
          const err = error as ErrorResponse;
          if(err.data.message) return toast.error(err.data.message);
          toast.error("Unable to update details.Please try again later.");
        }
    }
    return {handleUpdateDoctorDetails , isUpdatingDetails};
};
export default useUpdateDoctorDetails;