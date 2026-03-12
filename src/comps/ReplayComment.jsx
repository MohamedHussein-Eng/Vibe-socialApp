import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { baseUrl } from '../MainData'
import CreateReplayComment from './CreateReplayComment'
import { Spinner } from '@heroui/react'
import CommentComp from './CommentComp'

export default function ReplayComment(props) {
    const{commentId,postId}=props
    console.log(props);
    
    function getReplayComment()
    {
        return axios.get(`${baseUrl}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,{
             headers: {
        "token": localStorage.getItem("token") 
      }
        })
    }
    const{data,isLoading,isError}=useQuery({
        queryKey:["ReplayComment",commentId],
        queryFn:getReplayComment,
    })
    
     if (isLoading) return <div className="flex justify-center p-5"><Spinner color="primary" /></div>;
  if (isError) return <p className="text-danger text-center p-4">Error loading comments.</p>;
 
 
  return (
    <div >
      {data?.data?.data.replies.length==0?
      <p className="text-default-400 text-center p-4">No replay yet.</p>
      :
     data?.data?.data.replies.map((replay)=>{
       return <CommentComp comment={replay}/>
     })}
      <div>
        <CreateReplayComment commentId={commentId} postId={postId}/>
      </div>
      
    </div>
  )
}
