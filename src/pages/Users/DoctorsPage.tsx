import { useState } from "react";
import DoctorCard from "../../components/App/Doctors";
import Header from "../../components/Header";
import { useDisplayAllDoctorsQuery } from "../../redux/api/appApi";
import FilterBar from "../../components/ui/FilterBar";
import BasicPagination from "../../components/ui/Pagination";

export type DoctorwithDetails = {
  _id: string;
  name: string;
  profilePicture: string;
  doctorDetails: {
    experience: string;
    consultationFees: string;
    primarySpecialty: string;
    gender: string;
    professionalTitle: string;
    consultationLanguages: string;
  };
};

const DoctorCardSkeleton = () => (
  <div className="flex w-52 flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
);

const DoctorsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [search, setSearch] = useState("");
  const [sort] = useState("_id,asc");

  const { data, error, isLoading } = useDisplayAllDoctorsQuery({ page, limit, search, sort });
  console.log(data);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header value={search} onChange={handleSearchChange} />

      <div className="flex gap-6 p-7 mt-14">
        <FilterBar />

        <div className="flex-1">
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: limit }).map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))}
            </div>
          )}

          {error && <p className="text-red-500">Error loading doctors.</p>}

          {data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
