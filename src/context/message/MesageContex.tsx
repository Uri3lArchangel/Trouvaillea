'use client'
import { message } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import React, { createContext } from 'react'


export const MessageContext  = createContext<MessageInstance | null>(null)
function MessageApp({children}:{children:React.ReactNode}) {
    const [messageApi,contextHolder] = message.useMessage()
  return (
    <MessageContext.Provider value={messageApi}> 
        {contextHolder}
        {children}
    </MessageContext.Provider>
  )
}

export default MessageApp