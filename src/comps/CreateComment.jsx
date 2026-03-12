import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../MainData';

export default function CreateComment({ postId }) {
  const [commentContent, setCommentContent] = useState("");
  const queryClient = useQueryClient();
 
  const { mutate, isPending } = useMutation({
    mutationFn: (content) => 
      axios.post(
     
        `${baseUrl}/posts/${postId}/comments`, 
        { content: content },
        { 
          headers: { 
            "token": localStorage.getItem("token") 
          } 
        }
      ),
    onSuccess: () => {
      setCommentContent(""); 
      queryClient.invalidateQueries(["comment", postId]);
    },
    onError: (error) => {
      console.error("Failed to post comment:", error);
    }
  });
 
  const handleAddReply = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    mutate(commentContent);
  };

  return (
    <form onSubmit={handleAddReply} className="flex gap-2 mt-2 w-full p-3">
      <Input
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write a Comment..."
        size="sm"
        variant="bordered"
        radius="lg"
        className="flex-grow text-white"
        isDisabled={isPending}
      />
      <Button 
        type="submit"
        size="sm" 
        color="primary" 
        isLoading={isPending}
        isDisabled={!commentContent.trim()}
      >
        Comment
      </Button>
    </form>
  );
}