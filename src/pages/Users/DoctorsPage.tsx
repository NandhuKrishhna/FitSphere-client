import DoctorCard from "../../components/App/Doctors";
import Header from "../../components/Header";
import FilterBar from "../../components/ui/FilterBar";
import BasicPagination from "../../components/ui/Pagination";
import { DoctorCardSkeleton } from "@/components/skeleton/DoctorCardSkeleton";
import { DoctorwithDetails } from "@/types/DoctorTypes";
import { useDoctorsListing } from "@/hooks/App/useDoctorsListing";

const DoctorsPage = () => {
  const { data, error, isLoading, limit, search, handleSearchChange, handlePageChange, handleApplyFilters } =
    useDoctorsListing();
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header value={search} onChange={handleSearchChange} />
      <div className="flex flex-col p-7 mt-14 relative">
        <div className="sm:w-64 mb-6 sm:mb-0 sm:mr-6 lg:mb-6 lg:ml-14">
          <FilterBar onApplyFilters={handleApplyFilters} />
        </div>
        <div className="flex-1">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: limit }).map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))}
            </div>
          )}
          {error && (
            <p className="text-red-500">
              <span className="loading loading-bars loading-md"></span>
            </p>
          )}
          {data && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
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
              <div className="flex justify-center mt-4">
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
  );
};

export default DoctorsPage;
