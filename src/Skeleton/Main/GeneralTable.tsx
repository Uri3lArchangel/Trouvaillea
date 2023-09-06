'use client'
import React, { useContext, useEffect, useState } from 'react'
import table  from '../../../styles/misc/table.module.css'
import tabledata from '../../core/dummy/data/table.json'
import { UserData } from '@/src/context/Usercontext'
function GeneralTable({currentPrice,data}:{currentPrice:string,data:{Positions:{UUID:number,EntryPrice:number,EntryDate:Date}[]}[]}) {
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
    {
tabledata.map((i,index)=>(
  <tr key={index}>
  <td>{i.userId}</td>
  <td>${(i.price).toLocaleString()}</td>
  <td>${((26000/i.price)*parseFloat(currentPrice)-26).toFixed(2)}</td>
</tr>
))
    }
    {data.map((j,index)=>(
        j.Positions.map((i,index)=>
        <tr key={index}>
            <td>#{i.UUID}</td>
            <td>${(i.EntryPrice.toFixed(2)).toLocaleString()}</td>
            <td>${((26000/i.EntryPrice)*parseFloat(currentPrice)-26).toFixed(2)}</td>
        </tr>)
    ))}
  </table>
  )}else{
    return(
        <div className='text-center'>Loading...</div>
    )
  }
}

export default GeneralTable