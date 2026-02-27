import React from 'react'

export default function DescriptionLogin() {
  return (
    <section className='DescriptionLogin-section min-h-screen w-1/2 hidden lg:inline-block overflow-hidden '>
      <div className='relative overflow-hidden bg-[url(images/DescriptionLogin.png)] w-full h-full bg-cover  bg-center bg-no-repeat  scale-110 '>
   
    <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" ></div>
    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
    <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full text-white">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-primary font-bold">hub</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">Vibe</span>
      </div>
      <div className="max-w-lg">
        <h1 className="text-6xl font-bold leading-tight mb-6 ">
          Connect with your world.
        </h1>
        <p className="text-xl text-white/90 font-medium">
          Experience the next generation of social networking. Join thousands of creators today.
        </p>
      </div>
      <div className="flex gap-8 text-sm font-medium">
        <span>© 2026 Vibe Inc.</span>
        <a className="hover:underline" href="#">Privacy Policy</a>
        <a className="hover:underline" href="#">Terms of Service</a>
      </div>
    </div>
      </div>
    </section>
  )
}
