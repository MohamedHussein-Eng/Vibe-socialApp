import axios from 'axios'
import React from 'react'
import { baseUrl } from '../../MainData'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Divider, ScrollShadow } from '@heroui/react'
import { Link } from 'react-router-dom'

export default function Notfication() {
  // https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10
  function getAllNotification() {
    return axios.get(`${baseUrl}/notifications?unread=false`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  }
  const { data, isLoading } = useQuery({
    queryKey: ['GetAllNotification'],
    queryFn: getAllNotification
  })


  return (


    <div className="flex justify-center p-6 bg-[#0a0f1d] min-h-screen">
      <div className="w-full max-w-lg bg-[#111827] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Notifications</h2>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
            2 New
          </span>
        </div>

        <Divider className="bg-slate-800" />

        <ScrollShadow className="h-[600px]">
          {data?.data?.data.notifications.map((noti) => (
            <div key={noti.id} className="group transition-all">
              <div className={`flex items-start gap-4 p-4 hover:bg-slate-800/40 cursor-pointer transition-colors ${!noti.isRead ? 'bg-primary/5' : ''}`}>

                <div className="relative">
                  <Link to={"/profile/" + noti.actor._id}>
                    <Avatar
                      src={noti.actor.photo}
                      className="w-12 h-12 text-large border-2 border-slate-800"
                    />
                  </Link>
                  <div className={`absolute -bottom-1 -right-1 size-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center`}>

                  </div>
                </div>


                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-slate-300 leading-snug">
                      <span className="font-bold text-white hover:text-primary transition-colors">{noti.actor.name}</span>
                      {" "}
                      {noti.type === 'follow_user' ? 'started following you' :
                        noti.type === 'share_post' ? 'shared your post' : 'commented on your post'
                      }
                    </p>
                    {!noti.isRead && <div className="size-2.5 rounded-full bg-primary mt-1 shadow-[0_0_8px_rgba(0,111,238,0.8)]" />}
                  </div>

                  {noti.body && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/50">
                      <p className="text-xs text-slate-500 line-clamp-2 italic">"{noti.body}"</p>
                    </div>
                  )}

                  {noti.msg && (
                    <p className="mt-1 text-xs text-red-400/70 italic font-medium">{noti.msg}</p>
                  )}

                  <p className="mt-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">{noti.time}</p>
                </div>
              </div>
              <Divider className="bg-slate-800/50 mx-4 w-auto" />
            </div>
          ))}
        </ScrollShadow>

        {/* Footer */}
        <div className="p-3 bg-slate-900/50 text-center">
          <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">
            View All History
          </button>
        </div>
      </div>
    </div>
  )
}

