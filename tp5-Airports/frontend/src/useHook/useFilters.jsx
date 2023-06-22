import React, { useContext } from 'react'
import { FilterContext } from '../context/Filtro'

export function useFilters() {
  const { filters, setFilters } = useContext(FilterContext)
  
  const filterProducts = (items) => {
    let filteredProducts = items.filter(item => {
      if (filters.city === 'all') {
        return true; // Retorna todos los elementos si la categoría es 'all'
      } else if (filters.city === 'city') {
        return item.nombre.startsWith(filters.city); // Filtra por nombres de ciudad
      } else if (filters.city === 'iata_faa') {
        return item.iata_faa === filters.iata_faa; // Filtra por iata_faa
      }
      return false; // Retorna falso si no se cumple ninguna condición
    });

    return filteredProducts;
  }

  return { filterProducts, filters, setFilters };

}







