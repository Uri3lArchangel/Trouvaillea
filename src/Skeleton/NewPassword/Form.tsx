'use client'
import React, { useEffect, useRef, useState } from 'react'
import { handlePasswordSpecs } from '../functions/PasswordVerify'
import { useRouter, useSearchParams } from 'next/navigation'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

function Form() {

    const params = useSearchParams()
    const Verifier = params.get('token')
    const router=useRouter()
    const [pwdShow,setPwdState] = useState(false)
    const [confPwdShow,setConfPwdState] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPassRef = useRef<HTMLInputElement>(null)

  const passwordInputChanged = ()=>{
    
    if(passwordRef.current && passwordRef.current.value != ''){
     
      handlePasswordSpecs(passwordRef,confirmPassRef)
    }
  }
    const pwdVisibility = (a:string)=>{
        let selector = a
        let option = pwdShow
        let change=setPwdState
      
        if(a === 'conf'){
            option = confPwdShow
            change = setConfPwdState

        }
        if(option){

            const pwdElement = document.getElementById(selector) as HTMLInputElement
            pwdElement.type = "password"
            change(false)     

            return
        }

        const pwdElement = document.getElementById(selector) as HTMLInputElement
        pwdElement.type = "text"
        change(true)
    }
    const submitForm=async(e:React.MouseEvent<HTMLInputElement>)=>{
      e.preventDefault()
      if(!passwordRef.current || !confirmPassRef.current){
        return
      }
      const body={
        Password:passwordRef.current.value,
        Verifier
      }
      const data = await fetch(process.env.NODE_ENV != 'production'?'/api/passwordChange':window.location.origin+'/api/passwordChange',{
        method:'POST',
        body:JSON.stringify(body)
      })
      const result = await data.json()


      setTimeout(()=>{
        router.push('/auth/verifyemail')
      },3000)


    }
    useEffect(() => {

    }, [])
    
  return (
    <form className='py-20 space-y-10 text-center flex flex-col items-center w-full sm:py-32'>
        <h1 className='text-lg font-semibold'> Enter New Password</h1>
        <label htmlFor="email"></label>
        <div className='h-12 border-b flex items-center w-full sm:w-2/4  border-gray-400 bg-transparent text-white px-4'>
          <input required id='pass' onChange={passwordInputChanged}  ref={passwordRef} type={pwdShow?"text":"password"} placeholder='Password' className='w-full h-full bg-transparent border-0 outline-none' />{pwdShow?<AiFillEyeInvisible className=' cursor-pointer' onClick={()=>{pwdVisibility('pass')}} size={30} />:<AiFillEye className=' cursor-pointer' onClick={()=>{pwdVisibility('pass')}} size={30} />}
          <label htmlFor="pass"></label>
          </div>
        <div className='h-12 border-b flex items-center w-full sm:w-2/4  border-gray-400 bg-transparent text-white px-4'> <label htmlFor="conf"></label><input required id='conf' ref={confirmPassRef} onChange={passwordInputChanged} type={confPwdShow?"text":"password"}  placeholder='Confirm Password' className='w-full h-full bg-transparent border-0 outline-none' />{confPwdShow?<AiFillEyeInvisible className=' cursor-pointer' onClick={()=>{pwdVisibility('conf')}} size={30} />:<AiFillEye className=' cursor-pointer' onClick={()=>{pwdVisibility('conf')}} size={30} />}</div>
        <div className='w-fit' id='pwdSpecs' >
          <ul className=' text-red-500' >
            <li hidden>Password does not match</li>
            <li hidden>Password must include uppercase [A-Z]</li>
            <li hidden>Password must include number [0-9]</li>
            <li hidden>Password must be 8 characters or more</li>
            <li hidden>Password must include special characters ./*^=-$</li>
          </ul>
        </div>
        <input type="submit" value="Sign up" onClick={submitForm} className='bg-green-500 h-12 w-fit px-6 cursor-pointer'/>
      
    </form>
  )
}

export default Form