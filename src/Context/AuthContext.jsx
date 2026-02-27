import { useState } from "react";
import {  createContext } from "react";
import React from 'react'

export const AuthContext=createContext()



export default function AuthContextProvider({children}) {
    const[isLogin,setIslogin]=useState(localStorage.getItem("token"))
   
    
  return (
    <AuthContext.Provider value={{isLogin,setIslogin}}>
    
      {children}
    
    </AuthContext.Provider>
  )
}
