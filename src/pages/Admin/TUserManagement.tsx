import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import { useDoctorManagementQuery} from "../../redux/api/adminApi"

const TUserManagement = () => {
    const {data}  = useDoctorManagementQuery({})
    console.log(data)
    const [expanded, setExpanded] = useState(true)
    return (
        <div className="flex min-h-screen bg-gray-900">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
    
        <div className="flex-1 p-6 flex flex-col">
            <div className="flex flex-col gap-6 flex-1">
                <div className="bg-[#B1AEFF] w-full rounded-lg shadow-lg h-[60vh] flex items-center justify-center">
                    <div className="bg-[#DBC7FF] w-[95%] h-[80%] mt-10 rounded-t-md">
                        {/* Content inside the inner div */}
                        <table className="w-full border-collapse ">
            <thead className="bg-purple-500 text-black sticky top-0 ">
                <tr>
                    <th className="p-3 text-left w-1/9">Name</th>
                    <th className="p-3 text-left w-1/9">Email</th>
                    <th className="p-3 text-left w-1/9">Department</th>
                    <th className="p-3 text-left w-1/9">Status</th>
                    <th className="p-3 text-left w-1/9">Fee</th>
                    <th className="p-3 text-left w-1/9">Licence Number</th>
                    <th className="p-3 text-left w-1/9">Details</th>
                    <th className="p-3 text-left w-1/9">Action</th>
                </tr>
            </thead>
            </table>
                    </div>
                </div>
                
                {/* Bottom part */}
                <div className="flex gap-6 flex-1">
                    {/* Left Box */}
                    <div className="bg-[#B1AEFF] w-1/3 rounded-lg shadow-lg h-[50vh]">
                        <div className="bg-black w-full h-16 rounded-t-lg ">
                            <div className="flex items-center justify-center text-2xl p-3 font-medium text-white">
                                <p>Top Customers</p>
                            </div>
                        </div>
                    </div>
    
                    {/* Right Box */}
                    <div className="bg-[#B1AEFF] w-2/3 rounded-lg shadow-lg h-[50vh]">
                        <div className="bg-black w-full h-16 rounded-t-lg ">
                            <div className="flex items-center justify-center text-2xl p-3 font-medium text-white">
                                <p>Top Rated Doctors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default TUserManagement