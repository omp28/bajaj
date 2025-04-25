"use client";
import React, { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";
import { useDoctorStore } from "./store/doctorStore";
import { useQueryParams } from "./utils/queryParams";
import { Suspense } from "react";

function QueryParamsWrapper() {
  useQueryParams();
  return null;
}

export default function Home() {
  const { fetchDoctors } = useDoctorStore();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading search parameters...</div>}>
        <QueryParamsWrapper />
      </Suspense>

      <h1 className="text-3xl font-bold text-center mb-8">Find a Doctor</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64">
          <FilterPanel />
        </aside>
        <div className="flex-1">
          <DoctorList />
        </div>
      </div>
    </main>
  );
}
