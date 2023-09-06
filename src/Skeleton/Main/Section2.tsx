'use client'
import React, { useEffect, useState } from 'react'
import tableData from '../../../src/core/dummy/data/table.json'
import { fetchPrice } from '@/src/backend/web3/price/fetchLive'
import UserTable from './UserTable'
import GeneralTable from './GeneralTable'

function Section2({apikey,alluserData,uuid}:{apikey:string,alluserData:{Positions:{UUID:number,EntryPrice:number,EntryDate:Date}[]}[],uuid:number}) {
  const [price,setPrice] = useState<number>()

  const fetchBTCPrice = async()=>{
  const price = await fetchPrice(apikey)
  setPrice(Number((price).toFixed(6)))
  }
  useEffect(()=>{
    fetchBTCPrice()
  },[price])
  return (
    <>
    <article>
     <strong className='text-center block'>Your Position Stats</strong>
    <UserTable currentPrice={String(price)} data={alluserData} useruuid={uuid} />
      </article>
      
    <article>
    <strong className='text-center block'>All Users Position Stats</strong>
      <GeneralTable currentPrice={String(price)} data={alluserData} />
      </article>
    </>
  )
}

export default Section2