import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { baseUrl } from '../MainData'
import SuggestFollewer from './SuggestFollewercomp'
import LoaderHome from './LoaderHome'
import { Link } from 'react-router-dom'

export default function SuggestedPeople() {
    function showPeople()
    {
      return axios.get(`${baseUrl}/users/suggestions?limit=5`,
        {
           headers:
          {
            "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`
          }
        })
    }
    const {data,isLoading}=useQuery(
      {
        queryKey:["Suggested"],
        queryFn: showPeople
      }
    )
    if(isLoading) return <div className='w-full'><LoaderHome></LoaderHome></div>
  return (
    <aside class="w-1/3 hidden lg:flex flex-col sticky top-0 h-screen p-6 gap-6">
  <div className="bg-gray-700 rounded-2xl overflow-hidden">
    <div className="p-4">
      <h2 className="font-extrabold text-lg">Who to follow</h2>
    </div>
    <div className="flex flex-col">
    {data?.data?.data.suggestions.map((suggest,index)=>{
      return <SuggestFollewer name={data?.data?.data.suggestions[index].name} userName={data?.data?.data.suggestions[index].username??"UserName"} image={data?.data?.data.suggestions[index].photo} id={suggest._id}/>
    })}
      
    </div>
    <Link to={"/suggestions"}>
    
    <button className="w-full text-left p-4 text-primary text-sm hover:bg-slate-200 dark:hover:bg-white/5 transition-colors">
      Show more
    </button>
    </Link>
  </div>
</aside>

  )
}
