import { selectSelectedUser } from "@/redux/slice/socket.ioSlice";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";
import Navigation from "@/components/App/Navigation";
import Header from "@/components/App/Header";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { Roles } from "@/utils/Enums";


const ChatPage = () => {
    const selectedUser = useSelector(selectSelectedUser);
    console.log(selectedUser)
    const role = useSelector(selectCurrentUser)?.role
    return (
        <div className="min-h-screen bg-black">
          {role === Roles.USER && 
           <>
            <Header />
            <Navigation/>
           </>
          }
         
          <div className="flex items-center justify-center pt-5 px-4">
            <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
              <div className="flex h-full rounded-lg overflow-hidden">
                <Sidebar />
    
                {!selectedUser ? <NoChatSelected /> : <ChatContainer/>}
              </div>
            </div>
          </div>
        </div>
      );
}

export default ChatPage
