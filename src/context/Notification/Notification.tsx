'use client'

  import React, { createContext } from 'react';
  import { notification } from 'antd';
  import type { NotificationInstance } from 'antd/es/notification/interface';
import MessageApp from '../message/MesageContex';
  
  export const NotificationContext = createContext<NotificationInstance | null>(null)
  const NotificationApp = ({children}:{children:React.ReactNode}) => {
  const [api,contextHolder] = notification.useNotification({placement:"topLeft"})
  
  
    return (
      <NotificationContext.Provider value={api}>
        {contextHolder}
        <MessageApp>
        {children}
        </MessageApp>
      </NotificationContext.Provider>
    );
  };
  
  export default NotificationApp;