'use client'
import MainLayout from '@/src/Skeleton/Main/MainLayout'
import { NotificationContext } from '@/src/context/Notification/Notification';
import { MessageContext } from '@/src/context/message/MesageContex';
import React, { useContext, useRef } from 'react'


function page() {
  const message = useContext(MessageContext)!;
  const notification = useContext(NotificationContext)!;
    const emailRef=useRef<HTMLInputElement>(null)
    const reset = async()=>{
      message.destroy()
      notification.destroy()
      message.loading("Sending Reset Email",10000)
        const email = emailRef.current
        if(!email){
          message.destroy()
          notification.info({message:"Provide The Email Address Of The Account You Want To Reset Its Pasword"})
          return
        }
        if(email && email.value){
            const data = await fetch(process.env.NODE_ENV != 'production'?'/api/passwordreset':window.location.origin+'/api/passwordreset',{
                method:'POST',
                body:JSON.stringify({Email:email.value})
            })
            if(data.status == 500 || data.status == 400){
            const res = await data.json()

              message.destroy()
              notification.destroy()
              notification.error({message:res.message})
            }
        }
    }


  return (
    <>
    <MainLayout>
      <article className='text-center space-y-6 py-10'>
        <h1 className='text-xl font-bold'>Password Reset</h1>
        <p className='text-lg px-1'>Enter the email address for the account you want to reset</p>
        <div className='space-y-6'>
            <label htmlFor="email"></label>
        <input id='email' className='block text-black w-full h-10 px-2 outline-none sm:w-2/4 mx-auto lg:w-1/4' placeholder='Email Address' type="email"/>
        <button onClick={reset} className='bg-green-500 py-4 px-6 block mx-auto text-white rounded-xl hover:bg-green-600'>Reset</button>
        </div>
        </article>
    </MainLayout>
    </>
  )
}

export default page