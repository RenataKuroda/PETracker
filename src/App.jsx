import { Routes, Route, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { AuthProvider } from "./context/AuthProvider";

import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import CreatePet from './pages/CreatePet'
import UpdatePet from "./pages/UpdatePet";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import WeightHistory from "./components/WeightHistory";

import PrivateRoutes from "./components/PrivateRoutes";
import PetProfile from "./pages/PetProfile";

const App = () => {


  return (
    <>
    
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route element={<PrivateRoutes redirectTo='/login' />}>
              <Route path="/" element={<Home />} />
              <Route path="/createpet" element={<CreatePet />} />
              <Route path="/update/:id" element={<UpdatePet />} />
              <Route path="/:id/weighthistory" element={<WeightHistory />} />
              <Route path="/:id" element={<PetProfile/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
   
  }

export default App
