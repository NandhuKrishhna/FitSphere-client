import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Dropdown from "../Doctor/DrpDown";
import { useAppointmentData } from "@/hooks/App/useAppointmentData";

const AppointmentFilters: React.FC = () => {
  const { searchQuery, setSearchQuery, setStatusFilter, setItemsPerPage } = useAppointmentData();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by doctor name"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Dropdown
          title="Filter by status"
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ]}
          onChange={setStatusFilter}
        />
        <Dropdown
          title="Page"
          options={[
            { label: "5 per page", value: "5" },
            { label: "10 per page", value: "10" },
            { label: "15 per page", value: "15" },
          ]}
          onChange={(value) => setItemsPerPage(parseInt(value))}
        />
      </div>
    </div>
  );
};

export default AppointmentFilters;
