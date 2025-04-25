import React from "react";
import { useDoctorStore } from "../store/doctorStore";
import DoctorCard from "./DoctorCard";

const DoctorList: React.FC = () => {
  const { filteredDoctors, loading, error } = useDoctorStore();

  if (loading) {
    return <div className="text-center py-8">Loading doctors...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (filteredDoctors.length === 0) {
    return (
      <div className="text-center py-8">
        No doctors found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredDoctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
