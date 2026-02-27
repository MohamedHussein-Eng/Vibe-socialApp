import React from 'react'
import { Link } from 'react-router-dom'

export default function SignupNav() {
    return (
        <header class="w-full px-6 lg:px-10 py-2 flex items-center justify-between border-b border-slate-200  bg-white/20 backdrop-blur-md   z-50 fixed top-0 left-0 ">
            <div class="flex items-center gap-2">
                <div class="bg-primary p-1.5 rounded-lg text-white">
                    <span class="material-symbols-outlined block text-2xl">hub</span>
                </div>
                <span class="text-xl font-bold text-white">Vibe</span>
            </div>
           <div>
             <p class="text-center text-sm text-[#4c669a] dark:text-gray-400 ">
                Already Have An Account?!
                <Link class="font-bold text-primary hover:text-primary/80 ml-1" to={"/"}>    Go To Log in</Link>
            </p>
           </div>
        </header>
    )
}
