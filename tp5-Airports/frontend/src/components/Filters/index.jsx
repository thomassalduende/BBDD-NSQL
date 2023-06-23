import { useEffect, useState } from "react";
import { useFilters } from "../../useHook/useFilters";
import { getAllAirports } from "../../services/getAllAirports";

export function Filters() {
  const { filters, setFilters } = useFilters();
  const [airports, setAirports] = useState([]);

  const handleChangeCategory = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value
    }));
  };

  const handleChangeIataFaa = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      iata_faa: e.target.value
    }));
  };

  useEffect(() => {
    getAllAirports().then((res) => {
      setAirports(res);
    });
  }, []);

  return (
    <section className="flex justify-center mt-5 mb-5">
      <div className="flex items-center space-x-4">
        <div className="mr-7">
          <h2 className="text-lg font-medium mb-2 ml-7">CITY</h2>
          <select
            value={filters.category}
            onChange={handleChangeCategory}
            className="font-medium bg-orange-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-orange-600"
          >
            <option value="all">All</option>
            {airports.map((airport) => (
              <option key={airport.city} value={airport.city}>
                {airport.city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2 ml-3">IATA/FAA</h2>
          <select
            value={filters.iata_faa}
            onChange={handleChangeIataFaa}
            className="font-medium bg-orange-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-orange-600"
          >
            <option value="all">All</option>
            {airports.map((airport) => (
              <option key={airport.iata_faa} value={airport.iata_faa}>
                {airport.iata_faa}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
