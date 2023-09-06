import React from 'react'
import TopNav from './TopNav'
import Footer from './Footer'

function Nav_FooterSkeleton({children}:{children:React.ReactNode}) {
  return (
    <>
    <TopNav />
    {children}
    <Footer />
    </>
  )
}

export default Nav_FooterSkeleton