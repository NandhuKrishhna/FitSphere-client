import toast from "react-hot-toast";
import { useBlockUsersMutation, useUnblockUsersMutation } from "../../redux/api/adminApi";

 type ErrorResponse = {
  data :{
    message? :"string"
  };
  status:number
 }
export default function useBlockUnblockUser() {
  const [blockUser, { isLoading: isBlocking }] = useBlockUsersMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUsersMutation();

  const handleBlock = async (id: string) => {
    try {
      const response = await blockUser({ id }).unwrap();
      toast.success("User blocked successfully")
      return response;
    } catch (error) {
      const err  = error as ErrorResponse
      if(err?.data?.message)
       toast.error(err.data.message)
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      const response = await unblockUser({ id }).unwrap();
      toast.success("User unblocked successfully")
      return response;
    } catch (error) {
      const err  = error as ErrorResponse
      if(err?.data?.message)
       toast.error(err.data.message)
    }
  };

  return {
    handleBlock,
    handleUnblock,
    isBlocking,
    isUnblocking,
  };
}
