import React from 'react'
import LoaderHome from '../../comps/LoaderHome'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { baseUrl } from '../../MainData'
import PostCard from '../../comps/PostCard'
import { useParams } from 'react-router-dom'
import PostShareCard from '../../comps/postShareCard'
 export function fetchSinglePost(id)
  {
    return axios.get(`${baseUrl}/posts/${id}`,
      {
         headers:
        {
          "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  }
export default function Details () {
  const {id}=useParams()


const {data,isError,isFetching}=useQuery({

  queryKey:["getSinglePost"],
  queryFn:()=>fetchSinglePost(id)
})



  if(isFetching) return <LoaderHome from={"details"}/>
  if(isError) return "Error"
  return (
    <div className='my-10'>
      {data?.data?.data.post.isShare?
      <PostShareCard data={data}></PostShareCard>:
      <PostCard key={data?.data?.data.post.id} posts={data?.data?.data.post} 
                body={data?.data?.data.post.body}
                image={data?.data?.data.post.image??"" }
                 userPhoto={data?.data?.data.post.user.phote}
                  name={data?.data?.data.post.user.name} 
                  userName={data?.data?.data.post.user.username}
                   commentCount={data?.data?.data.post.commentsCount??0}
                    shareCount={data?.data?.data.post.sharesCount}
                     likesCount={data?.data?.data.post.likesCount}
                     id={data?.data?.data.post.user._id}
                     details={true}
                     ></PostCard> 
                     
      }
      </div>
  )
}
