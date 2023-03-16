let form = document.getElementById("form");
form.addEventListener("submit", signup);
let href=document.getElementById('href')
href.addEventListener('click',()=>{
  window.location.assign('login1.htm')
})
async function signup(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let pass = document.getElementById("pass").value;
  let email = document.getElementById("email").value;
  let myObj = {
    name: name,
    email: email,
    pass: pass,
  };
  parentNode = document.getElementById("text");
  parentNode.innerHTML = "";
  try {
    let promise1 = await axios.post("http://13.53.194.247:4000/user/signin", myObj);
    parentNode.innerHTML += `<h3>${promise1.data.message}</h3>`;
    window.location.assign('login1.htm')
  } catch (err) {
    console.log(err);
    parentNode.innerHTML += `<h3>${err.response.data.message}</h3>`;
  }
}

