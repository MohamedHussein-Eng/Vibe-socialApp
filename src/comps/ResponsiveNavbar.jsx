import React from 'react';
import { Home, Users, Play, Bell, Menu, Store } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom'
import { RiHomeSmileLine } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa6";
import { MdOutlineBookmarkAdded, MdOutlineNotificationAdd } from "react-icons/md";
import { BsFillPostcardHeartFill } from "react-icons/bs";
export default function MobileNavbar() {
  return (
  
       <nav className="fixed bottom-0 left-0 right-0 bg-[#101622]/30 backdrop-blur-sm  text-white  border-t border-gray-200 px-2 py-1 flex justify-between items-center z-50 ">

    <NavLink to={'/'} className="flex flex-col items-center gap-4 px-4 py-3 rounded-xl  font-bold">
      <RiHomeSmileLine className=' text-2xl' />
      <span>Home</span>
    </NavLink>
    <NavLink to={"/profile"} className="flex flex-col items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-100 hover:text-primary  transition-colors group">
     <FaUserSecret className=' text-2xl'/>
      <span>Profile</span>
    </NavLink>
    <NavLink to={"/notification"} className="flex flex-col items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-100 hover:text-primary  transition-colors group relative">
      <MdOutlineNotificationAdd className=' text-2xl'/>
      <span >Notifications</span>
      <span className="absolute right-4 bg-primary text-white text-[10px] size-5 hover:text-primary flex items-center justify-center rounded-full font-bold">3</span>
    </NavLink>
    
    
   
 </nav>
  );
}