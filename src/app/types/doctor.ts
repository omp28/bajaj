export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fee: number;
  consultationType: 'Video Consult' | 'In Clinic' | 'Both';
  rating: number;
  image: string;
  location?: string;
}

export type ConsultationType = 'Video Consult' | 'In Clinic';

export type SortOption = 'fees' | 'experience';

export interface Filters {
  consultationType: ConsultationType | null;
  specialties: string[];
  sortBy: SortOption | null;
  searchQuery: string;
}