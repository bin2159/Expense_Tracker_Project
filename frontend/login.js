let form=document.getElementById('form')
form.addEventListener('submit',signup)
async function signup(e){
    e.preventDefault()
    let name=document.getElementById('name').value
    let pass=document.getElementById('pass').value
    let email=document.getElementById('email').value
    let myObj={
        name:name,
        pass:pass,
        email:email
    }  
    try{
        parentNode=document.getElementById('text')
        parentNode.innerHTML=''
        let promise1=await axios.post('http://localhost:4000/user/signin',myObj) 
        if(promise1.data=='failed'){
            childHTML='<h3>This Email is already registered</h3>'
            parentNode.innerHTML=parentNode.innerHTML+childHTML
        }
        else{
            childHTML='<h3>Registered Successfully</h3>'
            parentNode.innerHTML=parentNode.innerHTML+childHTML
        }
    }
    catch(err){
        console.log(err)
    }
}