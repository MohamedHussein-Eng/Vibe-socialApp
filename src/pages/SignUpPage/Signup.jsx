import React from 'react'
import SignupForm from '../../comps/Login-SignupComp/SignupForm'
import SignupNav from '../../comps/Login-SignupComp/SignupNav'

export default function Signup() {
  return (
    <main className='min-h-vh w-full  px-8 py-12 bg-[#101622] flex  justify-center  ' style={{ fontFamily: 'Cairo, sans-serif' }}>
      <SignupNav/>
      <SignupForm />

    </main>
  )
}
