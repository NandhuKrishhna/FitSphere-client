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
  const weeks = getLocalStorageValue("weeksToGoal").replace(/"/g, "");
  const weeksToGoal = Number(weeks);

  const allDetails = {
    age: Number(getLocalStorageValue("age")),
    gender,
    height: Number(getLocalStorageValue("height")),
    weight,
    activityLevel,
    goal,
    targetWeight,
    weeksToGoal,
  };

  const onSubmit = async () => {
    try {
      const response = await userHealthDetail(allDetails).unwrap();
      toast.success(response.message);
      localStorage.removeItem("age");
      localStorage.removeItem("gender");
      localStorage.removeItem("height");
      localStorage.removeItem("weight");
      localStorage.removeItem("activityLevel");
      localStorage.removeItem("targetWeight");
      localStorage.removeItem("weeksToGoal");
      console.log("local storage cleared");
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
