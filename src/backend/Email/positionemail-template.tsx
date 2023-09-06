
export const PositionEmailTemplateResend = ({uuid,price}:{uuid:number,price:number})=>{
    return(
        <div>
            <h1 style={{padding:"2em 6em",boxShadow:"1px 1px 10px #0005",textAlign:"center",color:"#f09",backgroundColor:'black',width:"fit-content",margin:"auto",textTransform:"uppercase"}}>trouvaillea</h1>
            <h1>#{uuid} Position Opened</h1>
            <p>Hello #{uuid} a trading position has been opened by you at the BTC price of ${price.toLocaleString()}</p>
        </div>
    )
    }