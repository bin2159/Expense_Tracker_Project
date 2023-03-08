let form=document.getElementById('form')
form.addEventListener('submit',check)
async function check(e){
    e.preventDefault()
    let email=document.getElementById('email').value
    let pass=document.getElementById('pass').value
    let myObj={
        email:email,
        pass:pass
    }
    console.log(myObj)
    try{
        let promise=await axios.post('http://localhost:4000/user/login',myObj)
        console.log(promise)
        if(promise.data=='success'){
            alert('User logged in successfully')
        }
        if(promise.status==401){
            alert('Incorrect Password')
        }
        if(promise.status=404){
            alert('User not found')
        }
    }
    catch(err){
        console.log(err)
    }
}