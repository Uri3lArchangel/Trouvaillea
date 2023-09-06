import crypto from 'crypto'

const SALT = process.env.SALT!
export const HashPass =(Password:string)=>{
    const data = SALT + Password+ SALT
    let digest =''
for(let i=0;i<5;i++){
digest += crypto.createHash('sha256').update(data).digest("hex")
}
const result = crypto.createHash('sha512').update(digest).digest("hex")
return result
}