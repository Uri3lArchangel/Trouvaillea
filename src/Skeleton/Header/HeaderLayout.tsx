import React from 'react'
import headerL from '../../../styles/Home/HeaderLayout/headerL.module.css'

function HeaderLayout({children}:{children:React.ReactNode}) {
  return (
    <header className={headerL.HeaderContainer_0}>
        {children}
    </header>
  )
}

export default HeaderLayout