import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useAppointmentData } from "@/hooks/App/useAppointmentData";

const AppointmentTableHeader: React.FC = () => {
  const { sortField, sortDirection, handleSort } = useAppointmentData();

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="hidden md:grid grid-cols-12 bg-violet-300 p-4 rounded-t-lg font-medium text-gray-700 mb-2">
      <div className="col-span-4">
        <button onClick={() => handleSort("doctor")} className="flex items-center gap-1 hover:text-blue-600">
          Doctor {renderSortIcon("doctor")}
        </button>
      </div>
      <div className="col-span-3">
        <button onClick={() => handleSort("date")} className="flex items-center gap-1 hover:text-blue-600">
          Date & Time {renderSortIcon("date")}
        </button>
      </div>
      <div className="col-span-2">
        <button onClick={() => handleSort("consultationType")} className="flex items-center gap-1 hover:text-blue-600">
          Type {renderSortIcon("consultationType")}
        </button>
      </div>
      <div className="col-span-1">
        <button onClick={() => handleSort("amount")} className="flex items-center gap-1 hover:text-blue-600">
          Fee {renderSortIcon("amount")}
        </button>
      </div>
      <div className="col-span-1 text-center">
        <button onClick={() => handleSort("status")} className="flex items-center gap-1 hover:text-blue-600 mx-auto">
          Status {renderSortIcon("status")}
        </button>
      </div>
      <div className="col-span-1 text-center">Actions</div>
    </div>
  );
};

export default AppointmentTableHeader;
