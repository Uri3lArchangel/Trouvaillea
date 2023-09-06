
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){

    
const cookieInit = cookies().get("session-auth-0")


if(cookieInit){
    const cookie = cookieInit.value
      const res=await fetch(new URL('/api/decodecookie',req.url),{
        method:'POST',
        body:JSON.stringify({cookie})
    })
    const data = await res.json()
    const user = data.data
if(req.url == String(new URL('/',req.url))){
    if(!user.Status){
        
        return NextResponse.redirect(new URL('/auth/verifyemail',req.url))
    }
    if(Date.now() >= user.Expire){
        return NextResponse.redirect(new URL('/auth/signin',req.url))

    }
    return NextResponse.next()
}

if(req.nextUrl.pathname == "/auth/signin" ||req.nextUrl.pathname == "/auth/signup" ){
  

    if(!user && !user.Status){
        return NextResponse.redirect(new URL('/auth/verifyemail',req.url))

    }
    return NextResponse.redirect(new URL('/',res.url))

}
    
   if(req.nextUrl.pathname == "/auth/verifyemail" ){
    if(user && user.Status){
        return NextResponse.redirect(new URL('/',res.url))

    }

   }

}else{
   
    if(req.url === String(new URL('/',req.url))){
        return NextResponse.redirect(new URL('/auth/signin',req.url))
    }
    if(req.nextUrl.pathname.startsWith("/auth")){

    
        if(req.url != String(new URL('/auth/signin',req.url)) && req.url != String(new URL('/auth/signup',req.url))){
            return NextResponse.redirect(new URL('/auth/signin',req.url))
        }
        return NextResponse.next()



    }
}

}