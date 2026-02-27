
import './App.css'
import { Login } from './pages/LoginPage/Login'
import {HeroUIProvider} from '@heroui/react'
import Signup from './pages/SignUpPage/Signup'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import MainLayout from './pages/MainLayout/MainLayout'
import AuthContextProvider from './Context/AuthContext'
import ProtectedAuth from './comps/ProtectedRoutes/ProtectedAuth'
import Protectedpages from './comps/ProtectedRoutes/Protectedpages'
import {  QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Profile from './pages/Profile/profile'

const queryClient = new QueryClient()
function App() {


const routers = createBrowserRouter([
  {
    path: "/", 
    element: <MainLayout />,
    children: [
      { 
        path:'login',
        index: true, 
        element: <ProtectedAuth><Login /></ProtectedAuth>  
      },
      {
        path: "signup", 
        element: <ProtectedAuth><Signup /></ProtectedAuth>  
      },
      { 
        path: "/", 
        element: <Protectedpages><Home/></Protectedpages>
      },
      {
        path:"/profile",
        element:<Protectedpages><Profile/></Protectedpages>
      }
    ]
  }
]);

  return (
    <>
     <QueryClientProvider client={queryClient}>
       <HeroUIProvider>
        <Toaster />
        <AuthContextProvider>

        
      <RouterProvider router={routers}>
        
      
      </RouterProvider>
      </AuthContextProvider>
    </HeroUIProvider>
     </QueryClientProvider>
    </>
  )
}

export default App
