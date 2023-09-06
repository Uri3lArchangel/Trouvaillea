'use client'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

function DrawerData({isAuthenticated,setDrawerState}:{isAuthenticated:boolean,setDrawerState:React.Dispatch<React.SetStateAction<boolean>>}) {
    const router = useRouter()
    function closeDrawer(a:string){
        setDrawerState(false)
        router.push('/'+a)
    }
  if(!isAuthenticated) {
    return (
    <>
    <ul className='flex flex-col space-y-8 w-full'>
        <li>
            <Button onClick={()=>{closeDrawer('auth/signup')}} className=' w-full bg-green-500'>Sign Up</Button>
        </li>
        <li>
        <Button  onClick={()=>{closeDrawer('auth/signin')}} className='w-full'>Sign In</Button>
        </li>
    </ul>
    </>
  )
}else{
    return(
        <ul>
        <li>
        <Button onClick={()=>{closeDrawer('api/signout')}} danger className='w-full'>Sign Out</Button>
        </li>
    </ul>
    )
}
}

export default DrawerData