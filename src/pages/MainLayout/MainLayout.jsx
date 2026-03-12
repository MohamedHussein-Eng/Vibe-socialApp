
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import SideBar from '../../comps/SideBar'
import SuggestedPeople from '../../comps/SuggestedPeople'
import MobileNavbar from '../../comps/ResponsiveNavbar'


export default function MainLayout() {
  const{isLogin}=useContext(AuthContext)
   

 return (
    <>
  
      
        
             <main className="flex flex-col lg:hidden mobile-container">
              {isLogin &&<MobileNavbar/>}
          <Outlet />
                    
        </main>
        
       
    
        <div className="hidden lg:flex min-h-screen  ">
          {isLogin && <SideBar />}
          
          <main className="flex-1">
            <Outlet />
          </main>
          
       
        </div>
      
    </>
  );

}