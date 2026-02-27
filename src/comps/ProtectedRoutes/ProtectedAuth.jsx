import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuth({children}) {
 const {isLogin} =useContext(AuthContext)

 if(isLogin)
 {
    return <Navigate to={"/"}></Navigate>
 }
 else{
    return children
 }
}
