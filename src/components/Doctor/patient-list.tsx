import { ChevronDown } from "lucide-react";

interface PatientListProps {
  selectedTimeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
}

export default function PatientList({ selectedTimeFrame }: PatientListProps) {
  const patients = [
    {
      id: 1,
      name: "Kristin Watson",
      date: "May 6, 2022",
      time: "06:45 am",
      avatar: "/placeholder.svg?height=40&width=40",
      color: "bg-green-200",
    },
    {
      id: 2,
      name: "Savannah Nguyen",
      date: "February 11, 2019",
      time: "03:00 pm",
      avatar: "/placeholder.svg?height=40&width=40",
      color: "bg-green-200",
    },
    {
      id: 3,
      name: "Jerome Bell",
      date: "August 2, 2019",
      time: "12:35 pm",
      avatar: "/placeholder.svg?height=40&width=40",
      color: "bg-green-200",
    },
    {
      id: 4,
      name: "Bessie Cooper",
      date: "October 24, 2018",
      time: "01:19 pm",
      avatar: "/placeholder.svg?height=40&width=40",
      color: "bg-green-200",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Patients</h2>
        <div className="bg-gray-300 rounded-md px-3 py-1 flex items-center gap-2">
          <span className="text-sm">{selectedTimeFrame}</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="space-y-4">
        {patients.map((patient) => (
          <div key={patient.id} className="flex items-center gap-3">
            <img
              src={patient.avatar || "/placeholder.svg"}
              alt={patient.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-grow">
              <h3 className="text-sm font-medium">{patient.name}</h3>
              <p className="text-xs text-gray-600">{patient.date}</p>
            </div>
            <div className={`${patient.color} px-2 py-1 rounded-md text-xs`}>{patient.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
