import React from 'react'
import LoaderHome from '../../comps/LoaderHome'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { baseUrl } from '../../MainData'
import PostCard from '../../comps/PostCard'

export default function Home() {
  function getAllPosts() {
    return axios.get(`${baseUrl}/posts`,
      {
      
        headers:
        {
          "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  }
  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ['GetALLPosts'],
      queryFn: getAllPosts
    }
  )
console.log(data?.data?.data.posts);

  if (isLoading) return  <LoaderHome/>
  if (isError) return console.log("Eroror");
  
  return (
    <div className='mx-auto w-2/4'>
      {
        data?.data?.data.posts
          .map(() => {
           return <PostCard></PostCard>
          }
          )
      }
    </div>
  )
}
