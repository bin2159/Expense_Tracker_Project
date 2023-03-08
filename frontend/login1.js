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
        if(promise.data=='success'){
            alert('User logged in successfully')
        }
        if(promise.data=='error'){
            alert('Incorrect Password')
        }
        if(promise.data=='notfound'){
            alert('User not found')
        }
    }
    catch(err){
        console.log(err)
    }
}