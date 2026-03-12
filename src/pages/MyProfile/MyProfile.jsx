import axios from 'axios'
import React, { useContext } from 'react'
import { baseUrl } from '../../MainData'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../Context/AuthContext'
import ProfileHeader from '../../comps/Profile/ProfileHeader'
import MyPostsSaved from '../../comps/Profile/Posts_&Saved'
import ProfileLoading from '../../comps/Profile/ProfileLoading'

export default function MyProfile() {
  const { userData, isLoading:userDataLoading } = useContext(AuthContext)





  // Fetch User Posts
  function getUserPost() {
    return axios.get(`${baseUrl}/users/${userData._id}/posts`, {
      headers: {
        "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  const { data ,isLoading:postsLoading } = useQuery({
    queryKey: ['getuserpost'],
    queryFn: getUserPost
  })

  function getSavedPosts() {
    return axios.get(`${baseUrl}/users/bookmarks`, {
      headers: {
        "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`
      }
    })


  }

  const {data:savedPosts,isLoading:loadingSaved}=useQuery({
    queryKey:['getsavedposts'],
    queryFn:getSavedPosts
  })


if(loadingSaved||postsLoading||userDataLoading)return <ProfileLoading/>

  return (
    <div className='w-full overflow-hidden relative'>
      <ProfileHeader postsCount={data?.data?.data.posts?.length || 0} userData={userData} userDataLoading={userDataLoading} profile={false} />
      <MyPostsSaved posts={data?.data?.data.posts} savedPosts={savedPosts?.data?.data.bookmarks}  loading={loadingSaved||postsLoading} profile={false}  />
    </div>
  )
}