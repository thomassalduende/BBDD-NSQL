import { Route, Routes } from "react-router-dom"
import { Marvel } from "./pages/Marvel"
import { Home } from "./pages/Home"
import { Dc } from "./pages/Dc"
import { Header } from "./components/NabBar/index"
import { Template } from "./components/Template"

function App() {

  return (
    <>

    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route  path="/:id" element={<Template/>}/>
      <Route  path="/marvel" element={<Marvel/>}/>
      <Route  path="/dc" element={<Dc/>}/>
    </Routes>
    </>
  )
}

export default App
