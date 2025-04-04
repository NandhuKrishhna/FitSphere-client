const useUserManagement = () => {
    const UserStatusBadge = ({ status }: { status: string }) => {
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
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }
    const UserRoleBadge = ({ role }: { role: string }) => {
        const getRoleColor = () => {
            switch (role) {
                case "admin":
                    return "bg-purple-500/20 text-purple-500 border-purple-500/30"
                case "moderator":
                    return "bg-blue-500/20 text-blue-500 border-blue-500/30"
                case "user":
                    return "bg-indigo-500/20 text-indigo-500 border-indigo-500/30"
                default:
                    return "bg-gray-500/20 text-gray-500 border-gray-500/30"
            }
        }

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor()}`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
        )
    }
    return {
        UserStatusBadge,
        UserRoleBadge
    }

};
export default useUserManagement