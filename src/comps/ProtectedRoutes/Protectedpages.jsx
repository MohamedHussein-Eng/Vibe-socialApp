import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Protectedpages({children}) {
  const {isLogin} =useContext(AuthContext)
 
  if(isLogin)
  {
    return children
  }
  else{
     return <Navigate to={"/login"}></Navigate>
  }
}
