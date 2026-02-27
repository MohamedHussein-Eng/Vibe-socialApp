
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Navbar from '../../comps/Navbar'

export default function MainLayout() {
  const{isLogin}=useContext(AuthContext)
  return (
    <div className='flex gap-6  '>
      {isLogin&&<Navbar/>} 
       <Outlet/> 
      
    </div>
  )
}
