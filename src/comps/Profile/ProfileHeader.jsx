import React, { useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseUrl } from '../../MainData'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button, Skeleton, Spinner, useDisclosure } from '@heroui/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import cover_image from '../../images/cover.png'
export default function ProfileHeader({ postsCount, userData, profile, isFollowing }) {
  const quaryClient = useQueryClient()


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  function handleProfileImage(e) {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      onOpen()
    }
    e.target.value = ''
  }


  function uploadPhoto() {
    const form = new FormData()
    form.append("photo", image)
    return axios.put(`${baseUrl}/users/upload-photo`, form,
      {
        headers: {
          "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }

  const { isPending, mutate } = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: (req) => {
      toast.success(req?.data?.message)
      quaryClient.invalidateQueries(["userProfile"])
      quaryClient.invalidateQueries(["getuserpost"])

      onclose()

    }
  })


  function Follow_un() {
    return axios.put(`${baseUrl}/users/${userData._id}/follow`, {},
      {
        headers: {
          "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`,

        }
      }
    )
  }

  const { mutate: follow_un, isPending: loadingFollow  } = useMutation({
    mutationFn: Follow_un,
    onSuccess: () => {
      quaryClient.invalidateQueries(["userData", userData._id])
quaryClient.invalidateQueries(['userProfile'])


    }
  })



  return (
    <>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload Photo</ModalHeader>
              <ModalBody>
                <img src={imagePreview} alt="user Update Profile" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" isLoading={isPending} onPress={() => {
                  mutate()&& isPending && onClose()
                  

                }}>
                  {isPending ? "Uploading...." :
                    "Update"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <header className="relative">
        <div class="profile-cover w-full h-80  overflow-hidden rounded-b-xl">
          <img class="w-full h-full object-cover" data-alt="Wide landscape mountain lake scenery cover photo" src={userData.cover || cover_image} />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          {/* Profile Info Overlay Area */}
          <div className="px-8 flex flex-col md:flex-row md:items-end md:justify-between profile-picture-container">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Profile Picture */}
              <div className=" group flex mt-6">
                <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-background-light  bg-slate-200">
                  <img className="w-full h-full object-cover rounded-full" data-alt="Large circular professional portrait" src={userData.photo} alt="Profile" />
                 {!profile &&
                  <div className="flex absolute items-center justify-center bottom-3 right-2 z-50">
                    <div className="rounded-md bg-black/40 hover:bg-black/60 transition-colors p-1">
                      <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </label>
                      <input id="upload" type="file" accept='image/*' className="hidden" onChange={handleProfileImage} />
                    </div>
                  </div>
                }
                </div>
               
              </div>

              {/* Basic Identity */}
              <div className='flex gap-3'>
                <div className='flex w-1/2'>


                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold text-white text-nowrap">{userData.name}</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{userData.username}</p>
                  </div>
                </div>
              </div>

              {profile?
              (
                isFollowing ?
                
                <Button color="default" isDisabled={loadingFollow}  onPress={follow_un}>
                  unfollow</Button>
                :
                <Button color="primary" isDisabled={loadingFollow}  onPress={follow_un}>Follow</Button>)
              :null}
            </div>

          </div>
          {/* Stats */}
          <div className="flex items-center justify-end gap-12 mx-5  py-4 border-y lg:border-none border-slate-200 dark:border-slate-800">
            <div className="text-center ">
              <div className="text-xl font-bold text-white">{postsCount}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Posts</div>
            </div>
            <div className="text-center ">
              <div className="text-xl font-bold text-white">{userData.followersCount}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Followers</div>
            </div>
            <div className="text-center ">
              <div className="text-xl font-bold text-white">{userData.followingCount}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Following</div>
            </div>
          </div>
        </div>

        {/* Bio and Stats */}
        <div className="px-8 mt-6 grid grid-cols-1 gap-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-white">
            <div className='bg-primary/30 backdrop-blur-sm p-3 h-10 rounded-2xl shadow-primary shadow-sm flex justify-center items-center '>
              <h3>Email : {userData.email}</h3>
            </div>
            <div className='bg-primary/30 backdrop-blur-sm p-3 h-10 rounded-2xl shadow-primary shadow-sm flex justify-center items-center'>
              <h3>Date Of birth : {userData.dateOfBirth?.split("T")[0]}</h3>
            </div>
            <div className='bg-primary/30 backdrop-blur-sm p-3 h-10 rounded-2xl shadow-primary shadow-sm flex justify-center items-center'>
              <h3>Gender : {userData.gender}</h3>
            </div>
            <div className='bg-primary/30 backdrop-blur-sm p-3 h-10 rounded-2xl shadow-primary shadow-sm flex justify-center items-center'>
              <span>Joined {userData.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
