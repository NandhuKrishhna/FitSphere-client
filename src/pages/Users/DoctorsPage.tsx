// DoctorsPage.tsx
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
  const [filters, setFilters] = useState({
    gender: [] as string[],
    specialty: [] as string[],
    language: [] as string[],
    experience: 0,
  });

  const { data, error, isLoading } = useDisplayAllDoctorsQuery({
    page,
    limit,
    search,
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

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header value={search} onChange={handleSearchChange} />

      <div className="flex flex-col min-[528px]:flex-row gap-6 p-7 mt-14">
        <div className="w-full absolute top-0 left-0 min-[528px]:relative min-[528px]:w-auto min-[528px]:top-auto">
          <FilterBar onApplyFilters={handleApplyFilters} />
        </div>

        <div className="flex-1">
          {isLoading && (
            <div className="grid grid-cols-1 min-[417px]:grid-cols-2 min-[769px]:grid-cols-3 min-[1020px]:grid-cols-4 gap-4">
              {Array.from({ length: limit }).map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))}
            </div>
          )}

          {error && <p className="text-red-500">Error loading doctors.</p>}

          {data && (
            <>
              <div className="grid grid-cols-1 min-[530px]:grid-cols-2 min-[837px]:grid-cols-3 min-[1115px]:grid-cols-4 gap-4 ">
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
