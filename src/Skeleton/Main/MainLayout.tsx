import React from 'react'
import mainL from '../../../styles/Home/MainLayout/mainL.module.css'

interface Props{
    children:React.ReactNode
}

const MainLayout = ({children}:Props) => {
  return (
    <main className={mainL.MainContainer_0}>
        {children}
    </main>
  )
}

export default MainLayout