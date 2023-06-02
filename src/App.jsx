import { Routes, Route, Link, useParams } from "react-router-dom";

import './App.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import CreatePet from './pages/CreatePet'
import UpdatePet from "./pages/UpdatePet";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpet" element={<CreatePet />} />
        <Route path="/:id" element={<UpdatePet />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
   
}

export default App
