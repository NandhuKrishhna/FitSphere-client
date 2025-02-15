"use client"

import { useState, useEffect } from "react"
import type { Slot } from "../../types/Slot"
import SlotItem from "./SlotItems"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

type SlotListProps = {
  slots: Slot[]
  isLoading: boolean
  onCancel?: (slotId: string) => void
  isCancelLoading?: boolean
}

const SlotList = ({ slots, isLoading }: SlotListProps) => {
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [consultationType, setConsultationType] = useState<"all" | "video" | "audio">("all")
  const [status, setStatus] = useState<"all" | "booked" | "available" | "cancelled">("all")
  const [date, setDate] = useState("")

  const slotsPerPage = 5

  useEffect(() => {
    let result = slots

    if (consultationType !== "all") {
      result = result.filter((slot) => slot.consultationType === consultationType)
    }

    if (status !== "all") {
      result = result.filter((slot) => slot.status === status)
    }

    if (date) {
      result = result.filter((slot) => new Date(slot.date).toISOString().split("T")[0] === date)
    }

    setFilteredSlots(result)
    setCurrentPage(1)
  }, [slots, consultationType, status, date])

  const indexOfLastSlot = currentPage * slotsPerPage
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage
  const currentSlots = filteredSlots.slice(indexOfFirstSlot, indexOfLastSlot)

  const totalPages = Math.ceil(filteredSlots.length / slotsPerPage)

  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm h-[700px] flex flex-col">
      <h2 className="text-white text-lg font-semibold mb-4">Scheduled Slots</h2>

      <div className="flex space-x-2 mb-4">
        <Select onValueChange={(value: "all" | "video" | "audio") => setConsultationType(value)}>
          <SelectTrigger className="w-[180px]  bg-indigo-400">
            <SelectValue placeholder="Consultation Type" />
          </SelectTrigger>
          <SelectContent className="bg-indigo-300">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value: "all" | "booked" | "available" | "cancelled") => setStatus(value)}>
          <SelectTrigger className="w-[180px] bg-indigo-400">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-indigo-300">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Input type="date"
         placeholder="Select Date"
          onChange={(e) => setDate(e.target.value)} 
          className="w-[180px] cursor-pointer bg-indigo-400" />
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : currentSlots.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">No slots available.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {currentSlots.map((slot) => (
              <SlotItem key={slot._id} 
              slot={slot}  />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default SlotList

