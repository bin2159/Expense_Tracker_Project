let form = document.getElementById("form");
form.addEventListener("submit", signup);
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
    let promise1 = await axios.post("http://localhost:4000/user/signin", myObj);
    parentNode.innerHTML += `<h3>${promise1.data.message}</h3>`;
    window.location.href='/frontend/login1.htm'
  } catch (err) {
    console.log(err);
    parentNode.innerHTML += `<h3>${err.response.data.message}</h3>`;
  }
}

