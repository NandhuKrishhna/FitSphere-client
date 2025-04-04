import type React from "react"
import { BarChart, UserRound, Users, CheckCircle, ShieldCheck, DollarSign, Star } from "lucide-react"
import { useAdminDashboardQuery } from "@/redux/api/adminApi"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import { AvatarDemo } from "@/components/App/Avatar"
import { TopDoctor } from "@/types/admin.types"


const AdminDashboard: React.FC = () => {
    const { data: dashboardData, isLoading } = useAdminDashboardQuery({})

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!dashboardData || !dashboardData.success) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl">Failed to load dashboard data</div>
            </div>
        )
    }

    const { doctorDetails, userDetails, walletDetails } = dashboardData

    return (
        <div className="min-h-screen">
            <Header />
            <Navigation />
            <div className="bg-black p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-indigo-200 mt-1">Overview of platform statistics and performance</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Revenue Card */}
                        <div className="bg-indigo-900 rounded-xl shadow-sm p-6 border border-indigo-800">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-indigo-100">Total Revenue</h2>
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <DollarSign className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-emerald-400">{walletDetails.balance.toLocaleString()}</span>
                                <span className="ml-2 text-emerald-400">{walletDetails.currency}</span>
                            </div>
                            <div className="mt-2 text-sm text-indigo-200">Company wallet balance</div>
                        </div>

                        <div className="bg-indigo-900 rounded-xl shadow-sm p-6 border border-indigo-800">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-indigo-100">Doctors</h2>
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Users className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-white">{doctorDetails.totalDoctors}</span>
                                <span className="ml-2 text-indigo-200">total</span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-1" />
                                    <span className="text-sm text-emerald-400">{doctorDetails.approvedDoctors} approved</span>
                                </div>
                                <div className="flex items-center">
                                    <ShieldCheck className="h-4 w-4 text-indigo-700 mr-1" />
                                    <span className="text-sm text-indigo-200">{doctorDetails.verifiedDoctors} verified</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-900 rounded-xl shadow-sm p-6 border border-indigo-800">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-indigo-100">Users</h2>
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <UserRound className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-white">{userDetails.totalUsers}</span>
                                <span className="ml-2 text-indigo-200">total</span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-indigo-500 mr-1"></div>
                                    <span className="text-sm text-indigo-200">{userDetails.activeUsers} active</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-black mr-1"></div>
                                    <span className="text-sm text-indigo-200">{userDetails.blockedUsers} blocked</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-indigo-700 mr-1"></div>
                                    <span className="text-sm text-indigo-200">{userDetails.normalUsers} normal</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-indigo-300 mr-1"></div>
                                    <span className="text-sm text-indigo-200">{userDetails.premiumUsers} premium</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-900 rounded-xl shadow-sm border border-indigo-800 mb-8">
                        <div className="p-6 border-b border-indigo-800">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-indigo-100">Top Doctors</h2>
                                <BarChart className="h-5 w-5 text-indigo-300" />
                            </div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {doctorDetails.topDoctors.map((doctor: TopDoctor) => (
                                <div key={doctor._id} className="p-6 flex items-center">
                                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                                        <AvatarDemo image={doctor.profilePicture} name={doctor.name} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-white">{doctor.name}</h3>
                                        <p className="text-sm text-indigo-200">{doctor.email}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                                        <span className="font-medium text-white">{doctor.averageRating.toFixed(1)}</span>
                                        <span className="text-indigo-300 text-sm ml-1">({doctor.totalReviews} reviews)</span>
                                    </div>
                                </div>
                            ))}
                            {doctorDetails.topDoctors.length === 0 && (
                                <div className="p-6 text-center text-indigo-200">No top doctors found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

