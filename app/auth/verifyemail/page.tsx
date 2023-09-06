'use client'

import MainLayout from '@/src/Skeleton/Main/MainLayout'
import { NotificationContext } from '@/src/context/Notification/Notification'
import { MessageContext } from '@/src/context/message/MesageContex'
import React, { useContext } from 'react'

const page=()=> {
  const notification= useContext(NotificationContext)!
  const message = useContext(MessageContext)!
  const resend = async()=>{
message.destroy()
notification.destroy()
message.loading("Resending Verification Mail",10000)
   const res= await fetch(window.location.origin+"/api/resendEmail")
   let data = await res.json()
    if(res.status == 200 || res.status == 201){
      message.destroy()
      notification!.destroy()
      notification!.success({message:data.data})
    }else{
      message.destroy()
      notification!.destroy()
      notification!.error({message:data.data})
    }
   
  }
  return (
    <>   
     <MainLayout>
      <article className='text-center space-y-6 py-10'>
        <h1 className='text-xl font-bold'>Verify Your Email Address</h1>
        <p className='text-lg px-1'>We Have Sent A Verification Email to Your Email Address Open It And Follow The Instructions</p>
        <div className='space-y-6'>
          <button className='bg-transparent border w-fit border-gray-400 py-4 px-6 block mx-auto text-white rounded-xl hover:bg-white hover:text-black' onClick={resend}>
          Resend Email
          </button>
        <small className='block text-lg'>or</small>
        <input className='block text-black w-full h-10 px-2 outline-none sm:w-2/4 mx-auto lg:w-1/4' placeholder='New Email' type="text"/>
        <button className='bg-green-500 py-4 px-6 block mx-auto text-white rounded-xl hover:bg-green-600'>Change Email Address</button>
        </div>
        </article>
    </MainLayout>
    </>

  )
}

export default page