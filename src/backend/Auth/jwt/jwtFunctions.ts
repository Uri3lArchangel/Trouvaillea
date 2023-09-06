import JWT, { JwtPayload } from 'jsonwebtoken'
export  function JWTSign(obj:any,key:string) {
   let SignedToken= JWT.sign(obj,key)

   return SignedToken
}


export  function JWTDecode(token:string) {
    let data  = JWT.decode(token)

    return data
}