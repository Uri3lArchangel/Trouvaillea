import crypto from 'crypto'

const MAGICSALT = process.env.MAGICSALT!
export const LinkToken =(Email:string,uuid:number)=>{
    const data = MAGICSALT + Email+`${uuid}`+MAGICSALT
    let digest =''
for(let i=0;i<5;i++){
digest += crypto.createHash('sha256').update(data).digest("hex")
}
const result = crypto.createHash('sha512').update(digest).digest("hex")
return result
}