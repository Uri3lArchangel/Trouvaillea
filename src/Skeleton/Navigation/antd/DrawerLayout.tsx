import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

interface Props{
    stateChangeAct:React.Dispatch<React.SetStateAction<boolean>>
    drawerState:boolean
    data:string | React.ReactNode
}

const DrawerLayout = ({stateChangeAct,drawerState,data}:Props) => {

 
  const onClose = () => {
    stateChangeAct(false);
  };

  return (
    <>
      <Drawer title="" placement="right" onClose={onClose} open={drawerState}>
        {data}
      </Drawer>
    </>
  );
};

export default DrawerLayout;