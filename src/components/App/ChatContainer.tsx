import { ScrollArea } from "../ui/scroll-area";

// Sample data structure
interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isAudio?: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    content:
      "Could you describe your symptoms? That could be a contributing factor. Stress and poor nutrition can affect your energy levels and overall health. Do you have any other symptoms like nausea, fever, or changes in weight?",
    sender: "doctor",
    timestamp: "9:30",
  },
  {
    id: 2,
    content:
      "Sure, I've been feeling really tired, even after a full night's sleep. I also get headaches frequently, and sometimes I feel dizzy.",
    sender: "patient",
    timestamp: "9:30",
  },
  {
    id: 3,
    content: "",
    sender: "patient",
    timestamp: "9:31",
    isAudio: true,
  },
];
const ChatContainer = () => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "patient" ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-100"
              }`}
            >
              {message.isAudio ? (
                <div className="flex items-center gap-2 min-w-[200px]">
                  <div className="h-1 flex-1 bg-zinc-600 rounded-full">
                    <div className="h-full w-1/3 bg-zinc-400 rounded-full" />
                  </div>
                  <span className="text-xs">0:30</span>
                </div>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
              <span className="text-xs opacity-70 mt-1 block text-right">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatContainer;
