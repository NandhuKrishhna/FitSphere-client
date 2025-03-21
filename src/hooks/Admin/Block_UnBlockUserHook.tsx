import toast from "react-hot-toast";
import { useBlockUsersMutation, useUnblockUsersMutation } from "../../redux/api/adminApi";
import React from "react";

 type ErrorResponse = {
  data :{
    message? :"string"
  };
  status:number
 }
export default function useBlockUnblockUser() {
  const [blockUser ] = useBlockUsersMutation();
  const [unblockUser] = useUnblockUsersMutation();
  const [isblocking , setIsBlocking] = React.useState<{ [key: string]: boolean }>({})
  const [isunblocking , setIsUnBlocking] = React.useState<{ [key: string]: boolean }>({})

  const handleBlock = async (id: string , role : string) => {
    setIsBlocking((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await blockUser({ id , role}).unwrap();
      toast.success("User blocked successfully")
      return response;
    } catch (error) {
      const err  = error as ErrorResponse
      if(err?.data?.message)
       toast.error(err.data.message)
    }finally{
      setIsBlocking((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleUnblock = async (id: string, role : string) => {
    setIsUnBlocking((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await unblockUser({ id , role}).unwrap();
      toast.success("User unblocked successfully")
      return response;
    } catch (error) {
      const err  = error as ErrorResponse
      if(err?.data?.message)
       toast.error(err.data.message)
    }finally{
      setIsUnBlocking((prev) => ({ ...prev, [id]: false }));
    }
  };

  return {
    handleBlock,
    handleUnblock,
    isblocking,
    isunblocking

  };
}
