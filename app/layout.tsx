import Nav_FooterSkeleton from '@/src/Skeleton/Navigation/Nav_FooterSkeleton'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import Usercontext from '@/src/context/Usercontext'
import { FullDecode } from '@/src/backend/Auth/cookie_jwt_decode/decode'
import { cookies } from 'next/headers'
import NotificationApp from '@/src/context/Notification/Notification'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trouvaillea',
  description: 'Trouvaillea option trading',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieInit = cookies().get("session-auth-0")
  let user:{Email:string,Status:boolean,UUID:number,Positions:{EntryDate:Date,EntryPrice:number}[],Expire:Date} | null=null ;
  if(cookieInit){
  const cookie = cookieInit.value
  if(cookie){
user = await FullDecode(cookie)
  }
  }
  
  
  return (
    <html lang="en">
    
      <body className={inter.className}>
      <Script src="https://public.bnbstatic.com/unpkg/growth-widget/cryptoCurrencyWidget@0.0.9.min.js" strategy="afterInteractive"></Script>
      <NotificationApp>
      <Usercontext user={user}>
      <Nav_FooterSkeleton>
        {children}
        </Nav_FooterSkeleton>
        </Usercontext>
        </NotificationApp>
        </body>
    </html>
  )
} 
