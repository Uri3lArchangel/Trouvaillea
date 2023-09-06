'use client'
import { UserData } from '@/src/context/Usercontext'
import { Button } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NotificationContext } from '../../context/Notification/Notification'
import { MessageContext } from '@/src/context/message/MesageContex'
import { fetchPrice } from '@/src/backend/web3/price/fetchLive'



function Section1({apikey}:{apikey:string}) {

const message = useContext(MessageContext)!
  const notification= useContext(NotificationContext)!
  const [amount,setAmount] = useState<number>()
  const userData  = useContext(UserData)
  const addressref= useRef<HTMLInputElement>(null)

  const fetchBTCPrice = async()=>{
  const price = await fetchPrice(apikey)
  setAmount(Number((26/price).toFixed(6)))
  }
  const openPosition = async()=>{
    message.destroy()
message.loading("Opening Position",100000)
    const address = addressref.current
    if(!address || address.value==''){
      message.destroy()
      notification.destroy()
      notification.error({message:"Kindly Provide The Wallet Addres You Made The Transfer From"})
      return
    }
    const body = {walletaddress:address.value} 
    const res = await fetch(process.env.NODE_ENV != 'production'?"/api/openposition":window.location.origin+"/api/openposition",{
      method:"POST",
      mode:"no-cors",
      body:JSON.stringify(body)
    })
    let data = await res.json()
    if(res.status != 201){
      notification.destroy()
      message.destroy()
      notification.error({message:data.data})
      setTimeout(()=>{
        window.location.reload()
      },3000)
      return
    }
    message.destroy()
    notification.destroy()
      notification.success({message:data.data})
    
  }
useEffect(()=>{
  fetchBTCPrice()
},[])
  return (
    <article>
      
    <h1 className='text-2xl py-8 font-extrabold mt-16 sm:text-5xl'>
   
     <span className='text-pink-400'>Trouvaillea</span> Options <span className='text-blue-500'>Trading</span></h1>
     {userData?<h1>Welcome, #{userData.UUID}</h1>:<></>}
    <h2 className='text-xl font-semibold my-4 text-white/70 sm:text-2xl'>Open multiple long positions on the BTC market with just $26 each at x1000 Leverage</h2>
    <p className='sm:text-xl'>Get Your profit x1000 after 2 years based on how much the price has increased, <br /> with a liquidation price of $7000 <br /> the risk of loss is less than 1%</p>
    <h2 className='text-2xl font-bold my-4 lg:text-center'> <span className='text-orange-300'>BTC</span> Live Price</h2>
   <div className="binance-widget-marquee sm:relative sm:w-full sm:left-[50%]  sm:scale-[1.5] lg:left-[60%]"  data-cmc-ids="1" data-theme="dark" data-transparent="true" data-locale="en" data-powered-by="Powered by" data-disclaimer="Disclaimer" draggable={false} onClick={(e)=>{e.preventDefault()}}></div>
   <div className=' text-center space-y-4 mt-4'>
   <small className='sm:text-lg sm:my-6'>To Open a position</small>
   <br />
   
   <p>Deposit exactly {amount}btc($26) at the current price to the address below</p>
   <em>0x2eaa403d2734a70f1b27bf61a62f3c721d09a916</em>
   <br />
   <p>After deposit enter the address you transfered from (ensure it is the address you made the transaction from as there would be verification off the blockchain) </p>
   <input placeholder='your deposit address' ref={addressref} type="text" name="" id="" className=' text-black w-full h-10 sm:w-2/4 md:w-1/4 px-2' />
   <br />
   <Button onClick={openPosition} className='bg-white text-black w-full h-12  sm:w-1/4 lg:w-1/6 lg:text-2xl'>Call</Button>
   
   </div>
  </article>
  )
}

export default Section1