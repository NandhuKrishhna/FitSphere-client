import { useGetAppointmentDetailsQuery } from "@/redux/api/appApi"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import { IGetAppointment } from "@/types/api/appointment-api-types"
import { AppointmentQueryParams } from "@/types/appointmentList"
import { useState } from "react"
import { useSelector } from "react-redux"
import useDebounce from "../DebounceHook"


export const useAppointments = () => {
    const role = useSelector(selectCurrentUser)?.role
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all")
    const [consultationTypeFilter, setConsultationTypeFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "date",
        direction: "desc",
    })
    const [selectedAppointment, setSelectedAppointment] = useState<IGetAppointment | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const queryParams: AppointmentQueryParams = {
        page: currentPage,
        limit: 5,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
    }

    const debounceSearch = useDebounce(searchTerm, 500)
    if (debounceSearch) queryParams.search = debounceSearch
    if (statusFilter !== "all") queryParams.status = statusFilter
    if (paymentStatusFilter !== "all") queryParams.paymentStatus = paymentStatusFilter
    if (consultationTypeFilter !== "all") queryParams.consultationType = consultationTypeFilter

    const { data, isLoading, isFetching, error } = useGetAppointmentDetailsQuery(queryParams)

    const appointments = data?.data || []
    const totalPages = data?.meta?.totalPages || 1
    const totalItems = data?.meta?.total || 0

    const requestSort = (key: string) => {
        let direction: "asc" | "desc" = "asc"
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }

    const handleViewDetails = (appointment: IGetAppointment) => {
        setSelectedAppointment(appointment)
        setIsModalOpen(true)
    }

    return {
        role,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        paymentStatusFilter,
        setPaymentStatusFilter,
        consultationTypeFilter,
        setConsultationTypeFilter,
        currentPage,
        setCurrentPage,
        sortConfig,
        setSortConfig,
        selectedAppointment,
        setSelectedAppointment,
        isModalOpen,
        setIsModalOpen,
        appointments,
        totalPages,
        totalItems,
        isLoading,
        isFetching,
        error,
        requestSort,
        handleViewDetails,
        queryParams
    }
}
