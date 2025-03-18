import { useState, useEffect } from "react";

import { useGetAppointmentDetailsQuery } from "@/redux/api/appApi";
import { Appointment } from "@/types/appointmentList";

export const useAppointmentData = () => {
  const { data, isLoading } = useGetAppointmentDetailsQuery({});
  console.log(data)
  // State management
  const [processedAppointments, setProcessedAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (data?.success && data?.response) {
      let filtered = [...data.response];

      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter((appointment) => appointment.status === statusFilter);
      }

      // Apply search filter (doctor name)
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter((appointment) =>
          appointment.doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;
        if (sortField === "date") {
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortField === "doctor") {
          comparison = a.doctor.name.localeCompare(b.doctor.name);
        } else if (sortField === "status") {
          comparison = a.status.localeCompare(b.status);
        } else if (sortField === "amount") {
          comparison = a.amount - b.amount;
        } else if (sortField === "consultationType") {
          comparison = a.consultationType.localeCompare(b.consultationType);
        }
        return sortDirection === "asc" ? comparison : -comparison;
      });

      setProcessedAppointments(filtered);
    }
  }, [data, sortField, sortDirection, statusFilter, searchQuery]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedAppointments.length / itemsPerPage);

  // Sorting functions
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    isLoading,
    currentItems,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    handleSort,
    processedAppointments,
    indexOfLastItem,
    indexOfFirstItem,
  };
};
