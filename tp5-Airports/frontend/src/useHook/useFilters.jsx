import React, { useContext } from 'react';
import { FilterContext } from '../context/Filtro';


export function useFilters() {
  const { filters, setFilters } = useContext(FilterContext);
  
  const filterProducts = (items) => {
    console.log(filters.category, filters.iata_faa);
    if (filters.category === 'all' && filters.iata_faa === 'all') {
      return items; // Retorna todos los elementos si ambos filtros están establecidos en 'all'
    } else if (filters.category !== 'all' && filters.iata_faa === 'all') {
      return items.filter(item => item.city.startsWith(filters.category)); // Filtra por nombres de ciudad
    } else if (filters.category === 'all' && filters.iata_faa !== 'all') {
      return items.filter(item => item.iata_faa === filters.iata_faa); // Filtra por iata_faa
    } else if (filters.category !== 'all' && filters.iata_faa !== 'all') {
      return items.filter(item => item.city.startsWith(filters.category) && item.iata_faa === filters.iata_faa); // Filtra por nombres de ciudad y iata_faa
    }
    return []; // Retorna un arreglo vacío si no se cumple ninguna condición
  };

  return { filterProducts, filters, setFilters };
}







