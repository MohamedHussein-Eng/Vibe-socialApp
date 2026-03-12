
import { Avatar, Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../MainData';
import ReplayComment from './ReplayComment';
import CommentComp from './CommentComp';
import CreateComment from './CreateComment';

export default function Comments({ id }) {
  // 1. Store the ID of the specific comment being replied to, instead of a boolean


  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => axios.get(`${baseUrl}/posts/${id}/comments`, {
      headers: {
        "token": localStorage.getItem("token") 
      }
    }),
    enabled: !!id,
  });

  const comments = data?.data?.data.comments || [];

  if (isLoading) return <div className="flex justify-center p-5"><Spinner color="primary" /></div>;
  if (isError) return <p className="text-danger text-center p-4">Error loading comments.</p>;
 

  return (
    <>
    <div className="flex flex-col gap-4 mt-4">
      {
      comments.length === 0?
      <p className="text-default-400 text-center p-4">No comments yet.</p>
      :

      comments.map((comment) => (
       <CommentComp comment={comment} key={comment._id} post_id={id} details={true}/>
       
      ))}
    
      <CreateComment postId={id}/>
    </div>

    </>
  );
}