import { Routes, Route, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { AuthProvider } from "./context/AuthProvider";

import './App.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import CreatePet from './pages/CreatePet'
import UpdatePet from "./pages/UpdatePet";
import SignUp from "./components/Signup";
import Login from "./components/Login";

import supabase from "./config/supabaseClient";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  // const [session, setSession] = useState(null)

  //   useEffect(() => {
  //     supabase.auth.getSession().then(({ data: { session } }) => {
  //       setSession(session)
  //     })

  //     const {
  //       data: { subscription },
  //     } = supabase.auth.onAuthStateChange((_event, session) => {
  //       setSession(session)
  //     })
  //     console.log(session.user)
  //     return () => subscription.unsubscribe()
  //   }, [])

  //   if (!session) {
  //     return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>)
  //   }
  //   else {
  //     return (<div>Logged in!</div>)
  //   }
  
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
              <Route path="/:id" element={<UpdatePet />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  )
   
  }

export default App
