import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ChatHeader from "@/components/App/ChatHeader";
import ChatSideBar from "@/components/App/ChatSideBar";
import { Paperclip, Send, Smile } from "lucide-react";
import ChatContainer from "@/components/App/ChatContainer";

export default function ChatPage() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex bg-zinc-900">
        {/* Contacts sidebar */}
        <ChatSideBar />
        <div className="flex-1 flex flex-col">
          <ChatHeader />
          <ChatContainer />

          {/* Message input */}
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input placeholder="Type a message" className="bg-zinc-800 border-none text-zinc-100" />
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
