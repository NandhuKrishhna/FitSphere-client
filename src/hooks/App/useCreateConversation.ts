import { useCreateConversationMutation } from "@/redux/api/chatApi";
import { createConversationProps } from "@/utils/DoctorDetailsPageUtils";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";


const useCreateConversation = () => {
    const [createConversation] = useCreateConversationMutation();

    const createConversationHandler = async ({ senderId, receiverId }: createConversationProps) => {
        try {
            await createConversation({ senderId, receiverId }).unwrap();
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data?.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return { createConversationHandler };
};

export default useCreateConversation;
