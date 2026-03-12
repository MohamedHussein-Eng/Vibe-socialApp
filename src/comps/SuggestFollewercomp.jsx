import React from 'react'
import { Link } from 'react-router-dom';

export default function SuggestFollewer(props) {
    const { name, userName, image ,id } = props;
  
    
    return (
        <div className="px-4 py-3 flex items-center justify-between transition-colors">
            <div className="flex gap-3 min-w-0">
                <Link to={'/profile/'+id}>
                <div className="size-10 rounded-full  shrink-0" data-alt="Avatar of Creative Pulse">
                            <img src={image} alt="Profile Image" className='size-10 rounded-full'  />
                </div>
                </Link>
                <div className="min-w-0">
                    <div className="flex items-center gap-1">
                        <p className="font-bold text-sm truncate text-white">{name}</p>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{userName}</p>
                </div>
            </div>
            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold hover:opacity-80 transition-opacity">Follow</button>
        </div>
    )
}
