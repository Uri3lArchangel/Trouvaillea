export function generateRandomNumbers(count:number) {
   
  let uuid=0
    
    while (count >0) {
       uuid= parseInt((((Math.random()*1000000)*(Math.random()*1000000)+(Math.random()*1000000)+(Math.random()*1000000)+(Math.random()*1000000)*(Math.random()*1000000)).toFixed(0)).slice(0,6))
        count -=1
    }
 return uuid   
}

