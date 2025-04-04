import { useDisplayAllDoctorsQuery } from "@/redux/api/appApi";
import { useState } from "react";
import useDebounce from "../DebounceHook";

interface Filters {
  gender: string[];
  specialty: string[];
  language: string[];
  experience: number;
}

export const useDoctorsListing = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [search, setSearch] = useState("");
  const [sort] = useState("_id,asc");
  const [filters, setFilters] = useState<Filters>({
    gender: [],
    specialty: [],
    language: [],
    experience: 0,
  });
  const debouncedValue = useDebounce(search, 500)

  const { data, error, isLoading } = useDisplayAllDoctorsQuery({
    page,
    limit,
    search: debouncedValue,
    sort,
    ...filters,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return {
    data,
    error,
    isLoading,
    page,
    limit,
    search,
    filters,
    handleSearchChange,
    handlePageChange,
    handleApplyFilters,
  };
};
