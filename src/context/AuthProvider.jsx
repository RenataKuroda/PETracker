import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoadingUser(true)
    // const session = supabase.auth.getSession();
    // console.log(session)
    // setUser(session?.user ?? null);
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (isMounted) {
            console.log(session)
        setUser(session?.user ?? null)
        setIsLoadingUser(false)
        }
    });

    // const { data: subscription } = supabase.auth.onAuthStateChange(
    //   async (event, session) => {
    //     setUser(session?.user ?? null);
    //   }
    // );
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) {
        setUser(session?.user ?? null)
        setIsLoadingUser(false)
        }
    });

    setIsLoadingUser(true)

    return () => {
        console.log(subscription)
        isMounted = false
        subscription?.unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setUser(null)
      navigate("/")
    } catch (error) {
      console.log("Error occurred while logging out:", error)
    }
  };

  const register = async (userData) => {
    try {
      const { user, error } = await supabase.auth.signUp(userData)
      if (error) {
        throw error
      }
      console.log("Registration successful:", user)
      navigate("/login")
    } catch (error) {
      console.log("Error occurred while registering:", error)
    }
  };

  const login = async (fields) => {
    setIsLoadingUser(true)
    console.log(fields)
    try {
      const { data, error } = await supabase.auth.signInWithPassword(fields)
      if (error) {
        throw error
      }
      console.log("Login successful")
      setUser(data.user)
      console.log(data.user)
      setIsLoadingUser(false)
      navigate("/")
    } catch (error) {
      console.log("Error occurred while logging in:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
