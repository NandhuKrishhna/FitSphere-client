import { MessageSquare } from "lucide-react"

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-slate-800/30">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-violet-500/20 blur-lg"></div>
            <div className="w-20 h-20 rounded-full bg-violet-500/10 flex items-center justify-center relative">
              <MessageSquare className="w-10 h-10 text-violet-400" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white">Welcome to Chat</h2>
        <p className="text-slate-400 leading-relaxed">
          Select a conversation from the sidebar to start chatting with your contacts
        </p>

        <div className="pt-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-500/10 text-violet-300 text-sm">
            <span className="animate-pulse mr-2 size-2 bg-violet-500 rounded-full"></span>
            Waiting for selection
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoChatSelected
