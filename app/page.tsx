import HeaderLayout from '@/src/Skeleton/Header/HeaderLayout'
import MainLayout from '@/src/Skeleton/Main/MainLayout'
import React from 'react'
import Section1 from '@/src/Skeleton/Main/Section1'
import Section2 from '@/src/Skeleton/Main/Section2'
import { FullDecode } from '@/src/backend/Auth/cookie_jwt_decode/decode'
import { cookies } from 'next/headers'
const page = async() => {
 
  const res = await fetch(process.env.BASEURL!+"/api/getallusers",{next:{revalidate:500}})
  if(res.status == 500){
    return
  }
  const data = await res.json()
  const cookie = cookies().get("session-auth-0")
  if(!cookie){
    return
  }
  const userObj =await FullDecode(cookie.value)
  return (
    <>
    <HeaderLayout>

    </HeaderLayout>
    <MainLayout>
    <Section1 apikey={process.env.MORALESKEY!} />
    <article className='my-10'>
   <Section2 alluserData={data} uuid={userObj.UUID} apikey={process.env.MORALESKEY!} />
    </article>
    </MainLayout>
   
    </>
  )
}

export default page