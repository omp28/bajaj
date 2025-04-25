import React, { useEffect, useState } from "react";
import { useDoctorStore } from "../store/doctorStore";

const FilterPanel: React.FC = () => {
  const {
    doctors,
    filters,
    setConsultationType,
    toggleSpecialty,
    setSortOption,
  } = useDoctorStore();
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (doctors.length > 0) {
      const specialtySet = new Set<string>();
      doctors.forEach((doctor) => {
        doctor.specialities.forEach((specialty) => {
          specialtySet.add(specialty.name);
        });
      });
      setAvailableSpecialties(Array.from(specialtySet).sort());
    }
  }, [doctors]);

  return (
    <div className="w-64 bg-white p-4 border border-gray-200 rounded-md">
      <div className="mb-6">
        <h3
          data-testid="filter-header-moc"
          className="font-semibold text-lg mb-2"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultationType === "Video Consult"}
              onChange={() => setConsultationType("Video Consult")}
              className="mr-2"
            />
            Video Consult
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultationType === "In Clinic"}
              onChange={() => setConsultationType("In Clinic")}
              className="mr-2"
            />
            In Clinic
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3
          data-testid="filter-header-speciality"
          className="font-semibold text-lg mb-2"
        >
          Speciality
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {availableSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => toggleSpecialty(specialty)}
                className="mr-2"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3
          data-testid="filter-header-sort"
          className="font-semibold text-lg mb-2"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sortBy === "fees"}
              onChange={() => setSortOption("fees")}
              className="mr-2"
            />
            Fees (Low to High)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sortBy === "experience"}
              onChange={() => setSortOption("experience")}
              className="mr-2"
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
