import { useFilters } from "../../useHook/useFilters"

export function Filters() {
  const { filters, setFilters } = useFilters()

  const handleChangeCategory = (e) => {
    setFilters(prevState => ({
      ...prevState,
      category: e.target.value
    }))
  }

  return (
    <section className='filters'>
      <select value={filters.category} onChange={handleChangeCategory}>
        <option value="all">All</option>
        <option value="city">City</option>
        <option value="iata_faa">IATA FAA</option>
      </select>
    </section>
  )
}