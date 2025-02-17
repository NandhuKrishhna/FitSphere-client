import { Search } from "lucide-react";

import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
}
const contacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Good morning Dr. Sarah...",
    timestamp: "4m",
    unreadCount: 5,
    isOnline: true,
  },
  {
    id: 2,
    name: "Cameron",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Good morning Dr. Sarah...",
    timestamp: "15m",
  },
  // Add more contacts as needed
];

const ChatSideBar = () => {
  return (
    <div className="w-80 border-r border-zinc-800">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input placeholder="Search" className="bg-zinc-800 pl-9 text-zinc-100 border-none" />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)]">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center gap-3 p-4 hover:bg-zinc-800/50 cursor-pointer">
            <Avatar>
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-100">{contact.name}</p>
                <span className="text-xs text-zinc-400">{contact.timestamp}</span>
              </div>
              <p className="text-sm text-zinc-400 truncate">{contact.lastMessage}</p>
            </div>
            {contact.unreadCount && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                {contact.unreadCount}
              </span>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatSideBar;
