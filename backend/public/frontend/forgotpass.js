let fgtp=document.getElementById('fgtp')
fgtp.addEventListener('submit',resetp)
async function resetp(e){
    e.preventDefault()
    let email=document.getElementById('email').value
    let myObj={
        email:email
    }
    try{
    let promise=await axios.post(`http://13.53.194.247:4000/password/forgotpassword`,myObj)
        console.log(promise)
    }
    catch(err){
        console.log(err)
    }
}