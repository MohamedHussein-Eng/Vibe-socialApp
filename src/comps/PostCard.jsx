import React, { useContext, useState } from 'react';
import { Card, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";


import PostHeader from './postHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import Comments from './Comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../MainData';
import { AuthContext } from '../Context/AuthContext';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PostCard(props) {
  const { body, image, name, id, userName, userPhoto, commentCount, likesCount, shareCount, posts, details } = props;
  const queryClient = useQueryClient();
  const { userData } = useContext(AuthContext);
  const navigate=useNavigate()
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(body || "");

  const  { mutate: deletePost, isPending: isDeleting  } = useMutation({
    mutationFn: (postId) => {
      return axios.delete(`${baseUrl}/posts/${postId}`, {
        headers: {
          "token": localStorage.getItem("token")
        }
      });
    },
    onSuccess: (req) => {
      
      queryClient.invalidateQueries({ queryKey: ["GetALLPosts"] });
      queryClient.invalidateQueries({ queryKey: ["feedHome"] }); 
            toast.success(req?.data?.message)

        details&&navigate('/')
    },
  });

  
  
  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: (newText) => {
      return axios.put(`${baseUrl}/posts/${posts._id}`, 
        { body: newText },
        {
          headers: {
            "token": localStorage.getItem("token")
          }
        }
      );
    },
    onSuccess: (req) => {
      queryClient.invalidateQueries({ queryKey: ["GetALLPosts"] });
      queryClient.invalidateQueries({ queryKey: ["feedHome"] });
      queryClient.invalidateQueries({queryKey: ['getSinglePost']})
      setIsEditing(false); 
                  toast.success(req?.data?.message)

      
    },
  });

  const handleSaveEdit = () => {
    updatePost(editBody);
  };


  return (
    <>
      {body || image ? (
        <Card className="py-4 w-3/4 mx-auto h-auto bg-[#101622] border border-slate-200 mb-5">
          <div className='flex justify-between'>
               <PostHeader name={name} userName={userName} userPhoto={userPhoto} id={id} />
                 {userData._id === id && !isEditing && (
           
            <div className="flex justify-end gap-4 px-4 pt-2  mt-2  ">
        
         <Popover placement="right" >
      <PopoverTrigger className='text-white '>
        <HiOutlineDotsVertical />

      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-3">
          <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 font-bold text-sm hover:underline"
              >
                Edit Post
              </button>
              
              <button
                onClick={() => deletePost(posts._id)}
                disabled={isDeleting}
                className="text-danger font-bold text-sm hover:underline"
              >
                {isDeleting ? "Deleting..." : "Delete Post"}
              </button>
        </div>
      </PopoverContent>
    </Popover>
        
              
            </div>
          )}
          </div>


          {isEditing ? (
            <div className="px-4 py-3">
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 mb-2"
                rows="3"
                placeholder="What's on your mind?"
              />
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditing(false)} 
                  disabled={isUpdating}
                  className="text-slate-400 font-bold text-sm hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit} 
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full font-bold text-sm transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <PostBody body={body} image={image} />
          )}

          <PostFooter likesCount={likesCount} shareCount={shareCount} commentCount={commentCount} id={posts._id} />
          

         
          {details && <Comments id={posts._id} />}
        </Card>
      ) : null}
    </>
  );
}