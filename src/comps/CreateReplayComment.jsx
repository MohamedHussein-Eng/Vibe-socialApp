import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../MainData';

export default function CreateReplayComment({ commentId,postId }) {
  const [replyContent, setReplyContent] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (content) => 
      axios.post(
        `${baseUrl}/posts/${postId}/comments/${commentId}/replies`, 
        { content: content },
        { 
          headers: { 
            "token": localStorage.getItem("token") 
          } 
        }
      ),
    onSuccess: () => {
      setReplyContent(""); 
      queryClient.invalidateQueries(["ReplayComment", commentId]);
    },
    onError: (error) => {
      console.error("Failed to post reply:", error);
    }
  });
 
  const handleAddReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    mutate(replyContent);
  };

  return (
    <form onSubmit={handleAddReply} className="flex gap-2 mt-2 w-full">
      <Input
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Write a reply..."
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
        isDisabled={!replyContent.trim()}
      >
        Reply
      </Button>
    </form>
  );
}