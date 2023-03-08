let form=document.getElementById('form')
form.addEventListener('submit',signup)
async function signup(e){
    e.preventDefault()
    let name=document.getElementById('name')
    let pass=document.getElementById('pass')
    let email=document.getElementById('email')
    let myObj={
        name:name,
        pass:pass,
        email:email
    }
    try{
        let promise1=await axios.post('http://localhost:3000/user/signup',myObj) 
    }
    catch(err){
        console.log(err)
    }
}