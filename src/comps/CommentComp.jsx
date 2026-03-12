import React, { useState } from 'react';
import { Avatar, Button, Input, Spinner } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../MainData';
import ReplayComment from './ReplayComment';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function CommentComp({ comment, post_id, details }) {
  const queryClient = useQueryClient();
  const{userData}=useContext(AuthContext)

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);


  const currentUserId = userData.id;
  const isOwner = comment.commentCreator._id === currentUserId;

 const [isLiked, setIsLiked] = useState(comment.isLiked || false); 


  function handleReplyBtn(commentId) {
    setActiveReplyId(activeReplyId === commentId ? null : commentId);
  }


  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: () => axios.delete(`${baseUrl}/posts/${post_id}/comments/${comment._id}`, {
      headers: { "token": localStorage.getItem("token") }
    }),
    onSuccess: () => {

      queryClient.invalidateQueries(["comments", post_id]);
    },
    onError: (error) => console.error("Error deleting comment:", error)
  });

  const { mutate: updateComment, isPending: isUpdating } = useMutation({
    mutationFn: (newContent) => axios.put(`${baseUrl}/posts/${post_id}/comments/${comment._id}`,
      { content: newContent },
      { headers: { "token": localStorage.getItem("token") } }
    ),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries(["comments", post_id]);
    },
    onError: (error) => console.error("Error updating comment:", error)
  });

  const handleSaveEdit = () => {
    if (!editContent.trim()) return;
    if (editContent === comment.content) {
      setIsEditing(false);
      return;
    }
    updateComment(editContent);
  };
function un_likeComments() {
    return axios.put(`${baseUrl}/posts/${post_id}/comments/${comment._id}/like`,
      {}, 
      {   
        headers: {
          "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  }

  const { mutate: likeComment ,isPending:likeLoading } = useMutation({
    mutationFn: un_likeComments,
    onSuccess: (req) => {
    setIsLiked(req?.data?.data?.liked);
      
      queryClient.invalidateQueries({ queryKey: ["comments", post_id] });
    }
  });
  
 
  
  return (
    <div className="group flex gap-3 p-3 rounded-xl">
      <Avatar
        isBordered
        radius="full"
        size="sm"
        src={comment.commentCreator.photo}
        className="flex-shrink-0"
      />

      <div className="flex flex-col flex-grow">
        <div className="bg-default-100 p-3 rounded-2xl rounded-tl-none">
          <div className="flex justify-between items-center mb-1">
            <span className="text-tiny font-bold text-default-900">
              {comment.commentCreator.name}
            </span>
            <span className="text-[10px] text-default-400">
              @{comment.commentCreator.username}
            </span>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2 mt-2">
              <Input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                size="sm"
                variant="bordered"
                isDisabled={isUpdating}
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" color="primary" onPress={handleSaveEdit} isLoading={isUpdating}>
                  Save
                </Button>
                <Button size="sm" variant="flat" onPress={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }} isDisabled={isUpdating}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-small text-default-700 leading-relaxed">
              {comment.content}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-2 mt-1">
          <div className="flex gap-4">
           <button className="text-[10px] font-bold text-default-500 hover:underline" onClick={likeComment}>
  {likeLoading ? (
    <Spinner size="sm" color="primary" />
  ) : (
    isLiked 
      ? `Liked (${comment.likes.length})` 
      : `Like (${comment.likes.length})`
  )}
</button>

            {details && (
              <button
                onClick={() => handleReplyBtn(comment._id)}
                className="text-[10px] font-bold text-default-500 hover:underline"
              >
                Reply
              </button>
            )}

            {isOwner && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[10px] font-bold text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => {

                    deleteComment();

                  }}
                  className="text-[10px] font-bold text-danger hover:underline"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </>
            )}
          </div>

          {/* --- REPLIES --- */}
          {activeReplyId === comment._id && (
            <ReplayComment commentId={comment._id} postId={post_id} />
          )}
        </div>
      </div>
    </div>
  );
}