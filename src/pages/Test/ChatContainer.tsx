"use client"

import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { selectSelectedUser } from "@/redux/slice/socket.ioSlice"
import { formatMessageTime } from "./time"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import { useGetMessagesQuery } from "@/redux/api/chatApi"
import { getSocket } from "@/lib/socketManager"
import type { IMessage } from "@/types/api/chat-api-types"
import { cn } from "@/lib/utils"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import ImagePreviewModal from "@/components/ImagePreview"
import MessageSkeleton from "@/components/App/MessageSkeleton"


const ChatContainer = () => {
  const selectedUser = useSelector(selectSelectedUser)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const authUser = useSelector(selectCurrentUser)
  const {
    data: messages,
    isLoading: isMessageLoading,
    refetch,
  } = useGetMessagesQuery({
    receiverId: selectedUser?.doctorDetails?._id ?? "",
  })
  const socket = getSocket()

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = () => {
      refetch()
    }

    socket.on("newMessage", handleNewMessage)

    return () => {
      socket.off("newMessage", handleNewMessage)
    }
  }, [socket, refetch])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const handleCloseImagePreview = () => {
    setSelectedImage(null)
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-slate-800/30">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages?.messages?.map((message: IMessage, index: number) => {
          const isCurrentUser = message.senderId === authUser?._id
          const showAvatar = index === 0 || messages.messages[index - 1].senderId !== message.senderId

          return (
            <div key={message._id} className={cn("flex gap-3", isCurrentUser ? "justify-end" : "justify-start")}>
              {!isCurrentUser && showAvatar && (
                <div className="flex-shrink-0 mt-1">
                  <div className="size-8 rounded-full overflow-hidden border border-slate-700">
                    <img
                      src={selectedUser?.doctorDetails.profilePicture || "/avatar.png"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className={cn("flex flex-col max-w-[75%]", isCurrentUser ? "items-end" : "items-start")}>
                {showAvatar && (
                  <span className="text-xs text-slate-500 mb-1 px-2">
                    {isCurrentUser ? "You" : selectedUser?.doctorDetails.name}
                    {" • "}
                    {formatMessageTime(message.createdAt)}
                  </span>
                )}

                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 break-words",
                    isCurrentUser
                      ? "bg-violet-500 text-white rounded-tr-none"
                      : "bg-slate-700 text-slate-200 rounded-tl-none",
                  )}
                >
                  {message.image && (
                    <div className="mb-2 rounded-lg overflow-hidden">
                      <img
                        src={message.image || "/placeholder.svg"}
                        alt="Attachment"
                        className="max-w-full cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleImageClick(message.image!)}
                      />
                    </div>
                  )}
                  {message.message && <p>{message.message}</p>}
                </div>

                <span className="text-xs text-slate-500 mt-1 px-2">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {isCurrentUser && showAvatar && (
                <div className="flex-shrink-0 mt-1">
                  <div className="size-8 rounded-full overflow-hidden border border-slate-700">
                    <img
                      src={authUser?.profilePicture || "/avatar.png"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />

      {selectedImage && (
        <ImagePreviewModal
          src={selectedImage || "/placeholder.svg"}
          alt="Full Image Preview"
          onClose={handleCloseImagePreview}
        />
      )}
    </div>
  )
}

export default ChatContainer
