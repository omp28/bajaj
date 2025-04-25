import { ConsultationType, SortOption } from '../types/doctor';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'; 
import { useEffect, useRef } from 'react';
import { useDoctorStore } from '../store/doctorStore';

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters, setSearchQuery, setConsultationType, toggleSpecialty, setSortOption } = useDoctorStore();
  const initialLoadRef = useRef(true);
  const processedRef = useRef(false);
  
  useEffect(() => {
    if (!initialLoadRef.current || processedRef.current) return;
    
    const search = searchParams.get('search');
    const consult = searchParams.get('consult');
    const sort = searchParams.get('sort') as SortOption | null;
    const specialties = searchParams.getAll('specialties');
    
    processedRef.current = true;
    
    if (search) {
      setSearchQuery(search);
    }
    
    if (consult && (consult === 'Video Consult' || consult === 'In Clinic')) {
      setConsultationType(consult as ConsultationType);
    }
    
    if (specialties.length > 0) {
      specialties.forEach(specialty => {
        if (!filters.specialties.includes(specialty)) {
          toggleSpecialty(specialty);
        }
      });
    }
    
    if (sort && (sort === 'fees' || sort === 'experience')) {
      setSortOption(sort);
    }
    
    initialLoadRef.current = false;
    
    setTimeout(() => {
      processedRef.current = false;
    }, 100);
    
  }, [searchParams, setSearchQuery, setConsultationType, toggleSpecialty, setSortOption, filters.specialties]);

  useEffect(() => {
    if (initialLoadRef.current || processedRef.current) return;
    
    const params = new URLSearchParams();
    
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
  }, [filters, router, pathname]);
};