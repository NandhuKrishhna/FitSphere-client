import { useUserHealthDetailMutation } from "@/redux/api/caloriesApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

const useUserHealthDetails = () => {
  const [userHealthDetail, { isLoading }] = useUserHealthDetailMutation();
  const getLocalStorageValue = (key: string) => localStorage.getItem(key) || "";
  const weight = Number(getLocalStorageValue("weight"));
  const targetWeight = Number(getLocalStorageValue("targetWeight"));
  const goal = targetWeight > weight ? "gain" : targetWeight < weight ? "lose" : "maintain";
  const gender = getLocalStorageValue("gender").replace(/"/g, "");
  const activityLevel = getLocalStorageValue("activityLevel").replace(/"/g, "");
  const week = getLocalStorageValue("weeksToGoal");
  const updatedWeek = Number(week);

  const allDetails = {
    age: Number(getLocalStorageValue("age")),
    gender,
    height: Number(getLocalStorageValue("height")),
    weight,
    activityLevel,
    goal,
    targetWeight,
    weeksToGoal: updatedWeek
  };

  const onSubmit = async () => {
    try {
      const response = await userHealthDetail(allDetails).unwrap();
      toast.success(response.message);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.data.message) return toast.error(err.data.message);
    }
  };


  return {
    onSubmit,
    isLoading,
  };
};

export default useUserHealthDetails;
