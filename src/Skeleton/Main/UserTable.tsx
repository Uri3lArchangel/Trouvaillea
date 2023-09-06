'use client'
import React, { useContext, useEffect, useState } from 'react'
import table  from '../../../styles/misc/table.module.css'
import { UserData } from '@/src/context/Usercontext'
function UserTable({currentPrice,data,useruuid}:{currentPrice:string,data:{Positions:{UUID:number,EntryPrice:number,EntryDate:Date}[]}[],useruuid:number}) {
    const [browser,setIsBrowser]=useState(false)
    useEffect(() => {
            setIsBrowser(true)
        
    }, [])
    const userData  = useContext(UserData)
    
    
  if(browser){return (
    <table className={table.TableContainer_0}>
    <th>User Id</th>
    <th>Price Opened</th>
    <th>Profit (x1000)</th>
    {data.map((j)=>(
        j.Positions.map((i,index)=>(
        useruuid == i.UUID?<tr key={index}>
            <td>#{i.UUID}</td>
            <td>${(i.EntryPrice.toFixed(2)).toLocaleString()}</td>
            <td>${parseFloat(((26000/i.EntryPrice)*parseFloat(currentPrice)-26).toFixed(2)).toLocaleString()}</td>
        </tr>:<></>))
    ))}
  </table>
  )}else{
    return(
        <div className='text-center'>Loading...</div>
    )
  }
}

export default UserTable