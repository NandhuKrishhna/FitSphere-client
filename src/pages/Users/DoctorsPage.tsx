"use client";

import { useState } from "react";
import DoctorCard from "../../components/App/Doctors";
import FilterBar from "../../components/ui/FilterBar";
import BasicPagination from "../../components/ui/Pagination";
import { DoctorCardSkeleton } from "@/components/skeleton/DoctorCardSkeleton";
import type { DoctorwithDetails } from "@/types/DoctorTypes";
import { useDoctorsListing } from "@/hooks/App/useDoctorsListing";
import Navigation from "@/components/App/Navigation";
import Header from "@/components/App/Header";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Replace the Sheet component usage with this custom modal
const DoctorsPage = () => {
  const { data, error, isLoading, limit, search, handleSearchChange, handlePageChange, handleApplyFilters } =
    useDoctorsListing();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
      <Header value={search} onChange={handleSearchChange} />
      <Navigation />

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
          <div className="relative w-[300px] h-full bg-gray-900 border-r border-gray-800 overflow-auto">
            <div className="sticky top-0 flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 z-10">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFilterOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <FilterBar
                onApplyFilters={(filters) => {
                  handleApplyFilters(filters);
                  setIsFilterOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 mt-14">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Doctors</h1>
          <Button
            variant="outline"
            className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block md:w-64 shrink-0">
            <div className="sticky top-24 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <FilterBar onApplyFilters={handleApplyFilters} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: limit }).map((_, index) => (
                  <DoctorCardSkeleton key={index} />
                ))}
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-xl">
                <p className="text-red-400 mb-4">Failed to load doctors</p>
                <span className="loading loading-bars loading-md"></span>
              </div>
            )}

            {data && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.doctors?.map((doc: DoctorwithDetails) => (
                    <DoctorCard
                      key={doc._id}
                      id={doc._id}
                      name={doc.name}
                      experience={doc.doctorDetails.experience}
                      specialty={doc.doctorDetails.primarySpecialty}
                      profilePicture={doc.profilePicture}
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-10">
                  <BasicPagination
                    count={data.pagination.totalPages}
                    page={data.pagination.currentPage}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
