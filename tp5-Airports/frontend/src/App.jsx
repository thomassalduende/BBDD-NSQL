import { Route, Routes } from "react-router-dom";
import { AgregarAirport } from "./components/AgregarAirport";
import { Bienvenidos } from "./components/Bienvenidos";
import { Map } from "./components/Map";
import { Filters } from "./components/Filters";


function App() {

  return (
    <>
      <Bienvenidos />
      <Filters />
    <Routes>
      <Route path="/:id?" element={<Map />}/>
      
    </Routes>
    </>
  )
}

export default App
