import { Skeleton } from '@heroui/react'
import React from 'react'

export default function ProfileLoading() {
  return (
    
      <main className="flex-1 flex flex-col gap-6 mx-10">
        <header className="relative">
      {/* Cover Image Skeleton */}
      <div className="w-full h-80 overflow-hidden rounded-b-xl">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Profile Info Overlay Area */}
        <div className="px-8 flex flex-col md:flex-row md:items-end md:justify-between profile-picture-container">
          <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
            
            {/* Profile Picture Skeleton */}
            <div className="group flex mt-6">
              <Skeleton className="relative w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-background-light" />
            </div>

            {/* Basic Identity Skeleton */}
            <div className="flex gap-3 w-full">
              <div className="flex flex-col w-full pb-2 gap-3">
                <Skeleton className="h-8 w-48 rounded-lg" /> {/* Name */}
                <Skeleton className="h-5 w-32 rounded-lg" /> {/* Username */}
              </div>
            </div>

            {/* Follow/Unfollow Button Skeleton */}
            <div className="pb-2">
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center justify-end gap-12 mx-5 py-4 border-y lg:border-none border-slate-200 dark:border-slate-800">
          {[1, 2, 3].map((item) => (
            <div key={item} className="text-center flex flex-col items-center gap-2">
              <Skeleton className="h-6 w-12 rounded-lg" /> {/* Number */}
              <Skeleton className="h-4 w-20 rounded-lg" /> {/* Label */}
            </div>
          ))}
        </div>
      </div>

      {/* Bio and Stats Info Boxes Skeleton */}
      <div className="px-8 mt-6 grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Mapping 4 boxes for Email, DOB, Gender, and Joined Date */}
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-10 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </header>
   
 

    </main>
  )
}
