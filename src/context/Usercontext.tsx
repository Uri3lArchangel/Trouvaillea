'use client'

import React, { createContext } from 'react'

   export const UserData = createContext<{Email:string,Status:boolean,UUID:number,Positions:{EntryDate:Date,EntryPrice:number}[],Expire:Date}|null>(null)

const Usercontext = ({user,children}:{children:React.ReactNode,user:{Email:string,Status:boolean,UUID:number,Positions:{EntryDate:Date,EntryPrice:number}[],Expire:Date}|null}) => {
  return (
    <UserData.Provider value={user}>{children}</UserData.Provider>
  )
}

export default Usercontext