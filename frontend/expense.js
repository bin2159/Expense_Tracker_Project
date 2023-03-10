window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  let form = document.getElementById("form2");
  form.addEventListener("submit", store);
  const pay=document.getElementById('pay')
  pay.addEventListener('click',payment)
  let parentNode = document.getElementById("lists");
  getdata();
  async function store(e) {
    e.preventDefault();
    let examt = document.getElementById("examt").value;
    let desc = document.getElementById("desc").value;
    let cat = document.getElementById("cat").value;
    let myObj = {
      examt: examt,
      desc: desc,
      cat: cat,
    };
    try {
      await axios.post("http://localhost:4000/expense/post", myObj, {
        headers: { Authorization: token },
      });
      let promise = await axios.get("http://localhost:4000/expense/get", {
        headers: { Authorization: token },
      });
      display(promise.data[promise.data.length - 1]);
    } catch (err) {
      console.log(err);
    }
  }function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

  const decoded=parseJwt(token)
  console.log(decoded)
  const ispremium=decoded.ispremium

  if(ispremium){
    showPremium()
  }
  function showPremium(){
    document.body.removeChild(pay)
    document.getElementById('premium').innerHTML+='You are premium user'
    showleaderboard()
}

function showleaderboard(){
  const inputElement=document.createElement('input')
  inputElement.type="button"
  inputElement.value="Show Leaderboard"
  document.body.appendChild(inputElement)
  inputElement.onclick=async()=>{
    const userLeaderboard=await axios.get('http://localhost:4000/premium/showleaderboard')
    let leaderboard=document.getElementById('leaderboard')
    leaderboard.innerHTML+=`<h1>Leaderboard<h1>`
    console.log(userLeaderboard.data[0].id)
    userLeaderboard.data.forEach((userDetails)=>{
      leaderboard.innerHTML+=`<li>-${userDetails.name} TotalExpense--${userDetails.totalExpense}</li>`
    })
  }

}
  async function getdata() {
    try {
      let promise = await axios.get("http://localhost:4000/expense/get", {
        headers: { Authorization: token },
      });
      console.log(promise)
      for (let i = 0; i < promise.data.length; i++) {
        display(promise.data[i]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function display(myObj) {
    
    let childHTML = `<li id=${myObj.id} class='list'>${myObj.examt}--------${myObj.desc}--------${myObj.cat}
                    <button value='e'>Edit</button><button value='d'>Delete</button></li>`;
    parentNode.innerHTML += childHTML;
    console.log(myObj)
    let li = document.getElementsByClassName("list");
    for (let i = 0; i < li.length; i++) {
      li[i].addEventListener("click", edit);
    }
  }
  async function edit(e) {
    let item = e.target.parentElement;
    let id = item.id;
    if (e.target.value == "e") {
      try {
        let promise = await axios.get(
          `http://localhost:4000/expense/find/${id}`,{headers:{"Authorization":token}}
        );
        console.log(promise);
        document.getElementById("examt").value = promise.data.examt;
        document.getElementById("desc").value = promise.data.desc;
        document.getElementById("cat").value = promise.data.cat;
        await axios.delete(`http://localhost:4000/expense/del/${id}`,{headers:{"Authorization":token}});
        parentNode.removeChild(item);
      } catch (err) {
        console.log(err);
      }
    }
    if (e.target.value == "d") {
      try {
        await axios.delete(`http://localhost:4000/expense/del/${id}`,{headers:{"Authorization":token}});
        parentNode.removeChild(item);
      } catch (err) {
        console.log(err);
      }
    }
  }


  async function payment(e){
      const promise=await axios.get('http://localhost:4000/purchase/premiumpay',{headers:{'Authorization':token}})
      let options={
        "key":promise.data.key_id,
        "order_id":promise.data.order.id,
        handler:async function(promise){
          const res=await axios.post('http://localhost:4000/purchase/updatetransaction',{
            order_id:options.order_id,
            payment_id:options.key},
            {headers:{"Authorization":token}}
          )
          alert('You are a Premium User')
          showPremium()
          localStorage.setItem('token',res.data.token)
        }
      }
      const rzp1=new Razorpay(options)
      rzp1.open()
      e.preventDefault()
      rzp1.on('paymennt.failed',function(promise){
        console.log(promise)
        alert('something went wrong')
      })
    }
    
});
