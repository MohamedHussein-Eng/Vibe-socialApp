import React from 'react'
import PostHeader from './postHeader'
import PostBody from './PostBody'
import PostCard from './PostCard'
import { Card } from '@heroui/react'

export default function PostShareCard({data}) {
    console.log(data); 
    
  return (
    <div>
        <Card className='bg-primary w-3/4 mx-auto'>
               <PostHeader name={data?.data?.data.post.user.name} userName={data?.data?.data.post.user.username} userPhoto={data?.data?.data.post.user.photo} id={data?.data?.data.post.user._id} />
      <PostBody body={data?.data?.data?.post.body}></PostBody>
       <PostCard key={data?.data?.data.post.id} posts={data?.data?.data.post.sharedPost} 
                      body={data?.data?.data.post.sharedPost.body}
                      image={data?.data?.data.post.sharedPost.image??"" }
                       userPhoto={data?.data?.data.post.sharedPost.user.phote}
                        name={data?.data?.data.post.sharedPost.user.name} 
                        userName={data?.data?.data.post.sharedPost.user.username}
                         commentCount={data?.data?.data.post.sharedPost.commentsCount??0}
                          shareCount={data?.data?.data.post.sharedPost.sharesCount}
                           likesCount={data?.data?.data.post.sharedPost.likesCount}
                           id={data?.data?.data.post.sharedPost.user._id}
                           details={true}
                           ></PostCard> 
                           </Card>
    </div>
  )
}
