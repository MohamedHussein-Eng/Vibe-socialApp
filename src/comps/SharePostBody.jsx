import React from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function SharePostBody({ body, image, userData }) {
    return (
        <div className="p-6 space-y-4">
            {/* User Input Section */}

            {/* Original Post Preview (The Quote) */}
            <div className="ml-14 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:bg-slate-50 dark:hover:bg-[#1e293b] transition-colors cursor-pointer">
                <div className="p-4 space-y-3">
                    {/* Original Author Info */}
                    <div className="flex items-center gap-2">
                        <div className="size-10 rounded-full bg-cover bg-center" data-alt="Avatar of current logged in user" style={{ backgroundImage: `url("${userData.photo}")` }} />
                        <span className="font-bold text-sm text-white">{userData.name}</span>
                        {userData.username &&
                            <span className="text-white text-sm">@ {userData.username}</span>}
                    </div>
                    {/* Original Content */}
                    <p className="text-sm leading-relaxed text-slate-300">
                        {body}
                    </p>
                    {image &&
                        <div className="aspect-video w-full rounded-lg bg-slate-200 dark:bg-slate-800 bg-cover bg-center border border-slate-200 dark:border-slate-700" data-alt="Preview of a modern UI design dashboard" style={{ backgroundImage: `url(${image})` }} />
                    }
                </div>
            </div>
        </div>
    )
}
