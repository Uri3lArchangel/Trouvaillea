export const handlePasswordSpecs = (passwordRef:any,confirmPassRef:any)=>{
    const passRefHandler = passwordRef.current
    let v1=false,v2=false,v3=false,v4=false,v5=false
    const confirmPassRefHandler = confirmPassRef.current
    const list = document.querySelectorAll('#pwdSpecs li') as NodeListOf<HTMLLIElement>
    if(passRefHandler && confirmPassRefHandler){
      //Length check
      if(passRefHandler.value.length < 8){
       
        list[3].hidden = false
        v1=false
       
      }else{
        list[3].hidden = true 
        v1=true
         
      }
      //Uppercase check
      if(!(passRefHandler.value.match(/[A-Z]/))){
        list[1].hidden = false
        v2=false
        
      }else{
        list[1].hidden = true 
        v2=true
        
      }
      //Symbol check
      if(!(passRefHandler.value.match(/([\'\.,\*\\\@\#\$\%\^\&\!\~\`\<\>\/\?\,\)\(\=\+\-\_])/g))){
        list[4].hidden = false
        v3 = false
      }else{
        list[4].hidden = true 
        v3 = true
      }
    //Number Check
      if(!(passRefHandler.value.match(/[0-9]/))){
        list[2].hidden = false
        v4 = false
      }else{
        list[2].hidden = true 
        v4 = true
      }
      if(passRefHandler.value != confirmPassRefHandler.value){
        list[0].hidden = false
        v5 = false
      }else{
        list[0].hidden = true
        v5 = true 
      }
    }
    return v1&&v2&&v3&&v4&&v5
  }
