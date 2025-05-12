"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Smile, Paperclip, Send, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useSendMessage from "@/hooks/App/SendMessageHook"
import { useSelector } from "react-redux"
import { selectSelectedUser } from "@/redux/slice/socket.ioSlice"
import { getSocket } from "@/lib/socketManager"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import toast from "react-hot-toast"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { cn } from "@/lib/utils"

interface Emoji {
  native: string
}

const MessageInput: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser)
  const receiver = useSelector(selectSelectedUser)
  const selectedUserId = receiver?.doctorDetails._id

  const { isLoading, setMessage, handleSendMessage, message } = useSendMessage(selectedUserId)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let socket = getSocket()

    if (!socket || !socket.connected) {
      setTimeout(() => {
        socket = getSocket()
      }, 1000)
      return
    }

    if (message.trim()) {
      socket.emit("typing", { senderId: currentUser?._id, receiverId: receiver?.doctorDetails._id })
    } else {
      socket.emit("stop_typing", { senderId: currentUser?._id, receiverId: receiver?.doctorDetails._id })
    }
  }, [currentUser?._id, message, receiver?.doctorDetails._id])

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        emojiButtonRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showEmojiPicker])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const addEmoji = (emoji: Emoji) => {
    setMessage((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
    inputRef.current?.focus()
  }

  const sendMessage = () => {
    if (!message.trim() && !imagePreview) return
    handleSendMessage(imagePreview?.toString())
    setMessage("")
    removeImage()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="p-4 border-t border-slate-700/50 bg-slate-900/40 relative">
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-violet-500/20 rounded-lg blur opacity-50"></div>
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Preview"
              className="relative h-20 rounded-lg border border-slate-700 object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-slate-800 text-slate-200 rounded-full p-1 border border-slate-700 hover:bg-slate-700 transition-colors"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700/50 flex items-center overflow-hidden">
          <div className="relative">
            <Button
              ref={emojiButtonRef}
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-violet-400 hover:bg-slate-700/50 rounded-full h-9 w-9 ml-1"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              aria-label="Emoji picker"
            >
              <Smile className="h-5 w-5" />
            </Button>

            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-12 left-0 z-10 shadow-xl rounded-lg border border-slate-700 overflow-hidden"
              >
                <div className="em-emoji-picker">
                  <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            aria-label="Upload image"
          />

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-violet-400 hover:bg-slate-700/50 rounded-full h-9 w-9"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload image"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-violet-400 hover:bg-slate-700/50 rounded-full h-9 w-9"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Input
            ref={inputRef}
            placeholder="Type a message"
            className="bg-transparent border-none text-slate-200 placeholder:text-slate-500 focus-visible:ring-0 h-11"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button
          className={cn(
            "rounded-full h-11 w-11 flex-shrink-0 transition-all duration-200",
            (!message.trim() && !imagePreview) || isLoading
              ? "bg-slate-700 text-slate-400"
              : "bg-violet-600 hover:bg-violet-700 text-white",
          )}
          disabled={(!message.trim() && !imagePreview) || isLoading}
          onClick={sendMessage}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="size-5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></div>
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default MessageInput
