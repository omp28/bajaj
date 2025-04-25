import { Filters, ConsultationType, SortOption } from '../types/doctor';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'; // Changed import
import { useEffect } from 'react';
import { useDoctorStore } from '../store/doctorStore';

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters, setSearchQuery, setConsultationType, toggleSpecialty, setSortOption } = useDoctorStore();
  

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    

    params.delete('search');
    params.delete('consult');
    params.delete('specialties');
    params.delete('sort');
    
    if (filters.searchQuery) {
      params.set('search', filters.searchQuery);
    }
    
    if (filters.consultationType) {
      params.set('consult', filters.consultationType);
    }
    
    if (filters.specialties.length > 0) {
      filters.specialties.forEach(specialty => {
        params.append('specialties', specialty);
      });
    }
    
    if (filters.sortBy) {
      params.set('sort', filters.sortBy);
    }
    
    const newUrl = `${pathname}?${params.toString()}`;
    
    router.push(newUrl, { scroll: false });
  }, [filters, router, pathname, searchParams]);
  
  useEffect(() => {
    const search = searchParams.get('search');
    const consult = searchParams.get('consult');
    const sort = searchParams.get('sort');
    const specialties = searchParams.getAll('specialties');
    
    if (search) {
      setSearchQuery(search);
    }
    
    if (consult && (consult === 'Video Consult' || consult === 'In Clinic')) {
      setConsultationType(consult as ConsultationType);
    }
    
    if (specialties.length > 0) {
      specialties.forEach(specialty => {
        toggleSpecialty(specialty);
      });
    }
    
    if (sort && (sort === 'fees' || sort === 'experience')) {
      setSortOption(sort as SortOption);
    }
  }, [searchParams, setSearchQuery, setConsultationType, toggleSpecialty, setSortOption]);
};