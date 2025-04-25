import { create } from 'zustand';
import { Doctor, Filters, ConsultationType, SortOption } from '../types/doctor';

interface DoctorStore {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  filters: Filters;
  loading: boolean;
  error: string | null;
  
  fetchDoctors: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setConsultationType: (type: ConsultationType | null) => void;
  toggleSpecialty: (specialty: string) => void;
  setSortOption: (option: SortOption | null) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

export const useDoctorStore = create<DoctorStore>((set, get) => ({
  doctors: [],
  filteredDoctors: [],
  filters: {
    consultationType: null,
    specialties: [],
    sortBy: null,
    searchQuery: '',
  },
  loading: false,
  error: null,

  fetchDoctors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      set({ doctors: data, filteredDoctors: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setSearchQuery: (query: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        searchQuery: query,
      }
    }));
    get().applyFilters();
  },

  setConsultationType: (type: ConsultationType | null) => {
    set((state) => ({
      filters: {
        ...state.filters,
        consultationType: type,
      }
    }));
    get().applyFilters();
  },

  toggleSpecialty: (specialty: string) => {
    set((state) => {
      const specialties = state.filters.specialties.includes(specialty)
        ? state.filters.specialties.filter(s => s !== specialty)
        : [...state.filters.specialties, specialty];

      return {
        filters: {
          ...state.filters,
          specialties,
        }
      };
    });
    get().applyFilters();
  },

  setSortOption: (option: SortOption | null) => {
    set((state) => ({
      filters: {
        ...state.filters,
        sortBy: option,
      }
    }));
    get().applyFilters();
  },

  clearFilters: () => {
    set((state) => ({
      filters: {
        consultationType: null,
        specialties: [],
        sortBy: null,
        searchQuery: '',
      }
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    set((state) => {
      const { doctors, filters } = state;
      let filtered = [...doctors];
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(doctor => 
          doctor.name.toLowerCase().includes(query)
        );
      }
      
      if (filters.consultationType) {
        filtered = filtered.filter(doctor => 
          doctor.consultationType === filters.consultationType || 
          doctor.consultationType === 'Both'
        );
      }
      
      if (filters.specialties.length > 0) {
        filtered = filtered.filter(doctor => 
          filters.specialties.some(specialty => 
            doctor.specialty.includes(specialty)
          )
        );
      }
      
      if (filters.sortBy === 'fees') {
        filtered.sort((a, b) => a.fee - b.fee);
      } else if (filters.sortBy === 'experience') {
        filtered.sort((a, b) => b.experience - a.experience);
      }
      
      return { filteredDoctors: filtered };
    });
  }
}));