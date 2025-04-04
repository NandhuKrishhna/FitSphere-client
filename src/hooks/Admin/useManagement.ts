import { useState } from "react"
import useDebounce from "../DebounceHook"
import { UserQueryParams } from "@/types/auth.types"
import { useGetAllUsersQuery } from "@/redux/api/adminApi"
import useBlockUnblockUser from "./Block_UnBlockUserHook"

const useAdminUserManagement = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [verificationFilter, setVerificationFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState<{
        key: string
        direction: "asc" | "desc"
    }>({
        key: "name",
        direction: "asc",
    })
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const queryParams: UserQueryParams = {
        page: currentPage,
        limit: 5,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
    }

    if (debouncedSearchTerm) queryParams.search = debouncedSearchTerm
    if (statusFilter !== "all") queryParams.status = statusFilter
    if (verificationFilter !== "all") queryParams.isVerfied = verificationFilter === "verfied" ? "true" : "false"

    const { data, isLoading, error } = useGetAllUsersQuery(queryParams);
    const { handleBlock, handleUnblock, isblocking, isunblocking } = useBlockUnblockUser();

    const users = data?.users?.users || []
    const totalUsers = data?.users?.totalUsers || 0
    const totalPages = data?.users?.totalPages || 1
    const verifiedUsers = data?.users?.verifiedUsers || 0
    const activeUsers = data?.users?.activeUsers || 0
    const blockedUsers = data?.users?.blockedUsers || 0

    const chartData = [
        { name: "Verified", value: verifiedUsers, fill: "#6366f1" },
        { name: "Unverified", value: totalUsers - verifiedUsers, fill: "#f97316" },
        { name: "Active", value: activeUsers, fill: "#22c55e" },
        { name: "Blocked", value: blockedUsers, fill: "#ef4444" },
    ]

    const COLORS = ["#6366f1", "#f97316", "#22c55e", "#ef4444"]

    const requestSort = (key: string) => {
        let direction: "asc" | "desc" = "asc"
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }
    return {
        users,
        totalUsers,
        totalPages,
        verifiedUsers,
        activeUsers,
        blockedUsers,
        chartData,
        COLORS,
        requestSort,
        handleBlock,
        handleUnblock,
        isblocking,
        isunblocking,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        verificationFilter,
        setVerificationFilter,
        currentPage,
        setCurrentPage,
        isLoading,
        error,
        sortConfig,
        queryParams
    }
}
export default useAdminUserManagement;