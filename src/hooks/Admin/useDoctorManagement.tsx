import { DoctorQueryParams } from "@/types/DoctorTypes";
import { useState } from "react";
import useDebounce from "../DebounceHook";
import { useGetAllDoctorsQuery } from "@/redux/api/adminApi";
import useBlockUnblockUser from "./Block_UnBlockUserHook";

const useDoctorManagement = () => {
    const DoctorStatusBadge = ({ status }: { status: string }) => {
        const getStatusColor = () => {
            switch (status) {
                case "active":
                    return "bg-green-500/20 text-green-500 border-green-500/30"
                case "blocked":
                    return "bg-red-500/20 text-red-500 border-red-500/30"
                case "pending":
                    return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                default:
                    return "bg-gray-500/20 text-gray-500 border-gray-500/30"
            }
        }

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`
            }>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    const ApprovalBadge = ({ isApproved }: { isApproved: boolean }) => {
        const getApprovalColor = () => {
            return isApproved
                ? "bg-green-500/20 text-green-500 border-green-500/30"
                : "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
        }

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getApprovalColor()}`
            }>
                {isApproved ? "Approved" : "Pending"}
            </span>
        )
    }
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [verificationFilter, setVerificationFilter] = useState<string>("all")
    const [approvalFilter, setApprovalFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState<{
        key: string
        direction: "asc" | "desc"
    }>({
        key: "name",
        direction: "asc",
    })

    const queryParams: DoctorQueryParams = {
        page: currentPage,
        limit: 5,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
    }
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    if (debouncedSearchTerm) queryParams.search = debouncedSearchTerm
    if (statusFilter !== "all") queryParams.status = statusFilter
    if (verificationFilter !== "all") queryParams.isVerified = verificationFilter === "verified"
    if (approvalFilter !== "all") queryParams.isApproved = approvalFilter === "approved" ? "true" : "false"

    const { data, isLoading, error } = useGetAllDoctorsQuery(queryParams);
    const { handleBlock, handleUnblock, isblocking, isunblocking } = useBlockUnblockUser();

    const doctors = data?.doctors?.doctors || []
    const totalDoctors = data?.doctors?.totalDoctors || 0
    const totalPages = data?.doctors?.totalPages || 1
    const verifiedDoctors = data?.doctors?.verifiedDoctors || 0
    const activeDoctors = data?.doctors?.activeDoctors || 0
    const blockedDoctors = data?.doctors?.blockedDoctors || 0
    const pendingDoctors = data?.doctors?.pendingDoctors || 0
    const approvedDoctors = data?.doctors?.approvedDoctors || 0

    const chartData = [
        { name: "Verified", value: verifiedDoctors, fill: "#6366f1" },
        { name: "Approved", value: approvedDoctors, fill: "#22c55e" },
        { name: "Pending", value: pendingDoctors, fill: "#f97316" },
        { name: "Blocked", value: blockedDoctors, fill: "#ef4444" },
    ]

    const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"]

    const requestSort = (key: string) => {
        let direction: "asc" | "desc" = "asc"
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }
    return {
        DoctorStatusBadge,
        ApprovalBadge,
        handleBlock,
        handleUnblock,
        isblocking,
        isunblocking,
        doctors,
        totalDoctors,
        totalPages,
        verifiedDoctors,
        activeDoctors,
        blockedDoctors,
        pendingDoctors,
        approvedDoctors,
        chartData,
        COLORS,
        requestSort,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        verificationFilter,
        setVerificationFilter,
        approvalFilter,
        setApprovalFilter,
        currentPage,
        setCurrentPage,
        sortConfig,
        setSortConfig,
        isLoading,
        error,
        queryParams
    }

};
export default useDoctorManagement;