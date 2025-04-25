import React from "react";
import { Doctor } from "../types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const specialties = doctor.specialities.map((s) => s.name).join(", ");

  const experienceYears = doctor.experience.match(/\d+/)?.[0] || "";

  return (
    <div
      data-testid="doctor-card"
      className="bg-white p-4 rounded-md shadow-md flex"
    >
      <div className="w-24 h-24 mr-4">
        <img
          src={doctor.photo || "/doctor-placeholder.png"}
          alt={doctor.name}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/doctor.jpeg";
          }}
        />
      </div>

      <div className="flex-1">
        <h2
          data-testid="doctor-name"
          className="text-xl font-semibold text-gray-800"
        >
          {doctor.name}
        </h2>

        <p data-testid="doctor-specialty" className="text-gray-600 mt-1">
          {specialties}
        </p>

        <div className="flex items-center mt-2">
          <span data-testid="doctor-experience" className="text-gray-700 mr-4">
            {doctor.experience}
          </span>

          <span data-testid="doctor-fee" className="text-gray-700">
            {doctor.fees} consultation fee
          </span>
        </div>

        <div className="mt-3 flex">
          {doctor.video_consult && (
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm mr-2">
              Video Consult
            </div>
          )}

          {doctor.in_clinic && (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
              In Clinic
            </div>
          )}
        </div>

        {doctor.clinic && (
          <div className="mt-2 text-sm text-gray-600">
            {doctor.clinic.name}
            {doctor.clinic.address?.locality &&
              `, ${doctor.clinic.address.locality}`}
            {doctor.clinic.address?.city && `, ${doctor.clinic.address.city}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
