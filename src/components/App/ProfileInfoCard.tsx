import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileInfoCardProps } from "@/types/types";
const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ auth, healthData }) => {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-400">Full Name:</p>
                        <p className="font-medium text-white">{auth?.name || "User Name"}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Email:</p>
                        <p className="font-medium text-white">{auth?.email || "user@example.com"}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Age:</p>
                        <p className="font-medium text-white">{healthData?.userHealthDetails?.age || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Gender:</p>
                        <p className="font-medium text-white capitalize">
                            {healthData?.userHealthDetails?.gender || "N/A"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default ProfileInfoCard;