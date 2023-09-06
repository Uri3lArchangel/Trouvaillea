import { Resend } from "resend"
import { EmailTemplateResend } from "./email-template"
import { PositionEmailTemplateResend } from "./positionemail-template"

const resend = new Resend(process.env.RESENDAPIKEY!)

export async function SEND(email:string,uuid:number,verifierToken:string) {
    try {
        const data = await resend.emails.send({
            from:"Trouvaillea Contact <contact@trouvaillea.com>",
            to:email,
            subject:"Email Verification",
            react:EmailTemplateResend({uuid,verifierToken})
        })
        return {status:true,message:"email sent successfully"}
    } catch (error:any) {
        return {status:false,message:error.message}
    }
}

export async function SENDCONFIRMATION(email:string,uuid:number,price:number) {
    try {
        const data = await resend.emails.send({
            from:"Trouvaillea Contact <contact@trouvaillea.com>",
            to:email,
            subject:"Email Verification",
            react:PositionEmailTemplateResend({uuid,price})
        })
        return {status:true,message:"email sent successfully"}
    } catch (error:any) {
        return {status:false,message:error.message}
    }
}