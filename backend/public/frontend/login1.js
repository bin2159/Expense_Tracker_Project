
let form1 = document.getElementById("form1");
form1.addEventListener("submit", check);
let href=document.getElementById('href')
href.addEventListener('click',()=>{
  window.location.assign('login.html')
})
async function check(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let myObj = {
    email: email,
    pass: pass,
  };
  parentNode = document.getElementById("text1");
  parentNode.innerHTML = "";

  axios
    .post("http://13.53.194.247:4000/user/login", myObj)
    .then((promise1) => {
      parentNode.innerHTML += `<h3>${promise1.data.message}</h3>`;
      localStorage.setItem('token',promise1.data.token)
      window.location.assign('expenses.htm')
    })
    .catch((err) => {
        console.log(err)
      parentNode.innerHTML += `<h3>${err.response.data.message}</h3>`;
    });
}
forgotpassbtn()
function forgotpassbtn(){
  let fgt=document.createElement('input')
  fgt.type='button'
  fgt.value='Forgot Password'
  form1.appendChild(fgt)
  fgt.addEventListener('click',forgotpassfn)
}
function forgotpassfn(){
  window.location.href='forgotpass.htm'

}