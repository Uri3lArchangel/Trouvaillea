
export const EmailTemplateResend = ({uuid,verifierToken}:{uuid:number,verifierToken:string})=>{
return(
    <div>
        <h1 style={{padding:"2em 6em",boxShadow:"1px 1px 10px #0005",textAlign:"center",color:"#f09",backgroundColor:'black',width:"fit-content",margin:"auto",textTransform:"uppercase"}}>trouvaillea</h1>
        <h1>Hello #{uuid},You are required to verify your Email</h1>
        <p>Your email has been used to sign up on trouvaillea.com and to endure you were the one that registered this email please click the link below</p>
        <p>It is only valid for 30minutes</p>
        <p>{`${process.env.BASEURL}/api/verifyemail?verifytoken=${verifierToken}`}</p>
    </div>
)
}