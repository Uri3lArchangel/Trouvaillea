
import crypto from 'crypto'
const algorithm:crypto.CipherGCMTypes="aes-256-gcm"
const key = process.env.GCMKEY!
const iv = process.env.IV!
export const encryptData = (jwt:string)=>{
    const cipher = crypto.createCipheriv(algorithm,key,iv)
    let encryptedData = cipher.update(jwt,"utf-8","hex")
    encryptedData+= cipher.final("hex")
    return encryptedData
}

export const decryptData = (encryptedData:string)=>{
    const cipher = crypto.createDecipheriv(algorithm,key,iv)
    let decryptedData = cipher.update(encryptedData,"hex","utf-8")
    // decryptedData+= cipher.final("utf-8")

    return decryptedData
}