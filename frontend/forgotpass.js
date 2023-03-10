let fgtp=document.getElementById('fgtp')
fgtp.addEventListener('submit',resetp)
async function resetp(e){
    e.preventDefault()
    let email=document.getElementById('email').value
    let myObj={
        email:email
    }
    try{
    let promise=await axios.post(`http://localhost:4000/password/forgotpassword`,myObj)
        console.log(promise)
    }
    catch(err){
        console.log(err)
    }
}