import { Route, Routes } from "react-router-dom";
import { AgregarAirport } from "./components/AgregarAirport";
import { Bienvenidos } from "./components/Bienvenidos";
import { Map } from "./components/Map";
import { Modal } from "./components/Modal/modal";


function App() {

  return (
    <>
      <Bienvenidos />
    <Routes>
      <Route path="/:id?" element={<Map />}/>
    </Routes>
    </>
  )
}

export default App