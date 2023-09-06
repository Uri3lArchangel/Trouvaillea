export const signout = async()=>{
await fetch(process.env.NODE_ENV != 'production'?'/api/signout':window.location.origin+'/api/signout')
window.location.reload()
}