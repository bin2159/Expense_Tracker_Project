window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  let form = document.getElementById("form2");
  form.addEventListener("submit", store);
  const pay = document.getElementById("pay");
  pay.addEventListener("click", payment);
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
  }
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const decoded = parseJwt(token);
  const ispremium = decoded.ispremium;

  if (ispremium) {
    showPremium();
  }
  function showPremium() {
    document.body.removeChild(pay);
    document.getElementById("premium").innerHTML += "You are premium user";
    downloadbtn();
    showleaderboard();
  }

  async function downloadbtn() {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Download";
    const div = document.getElementById("premium");
    div.appendChild(btn);
    btn.onclick = async () => {
      let promise = await axios.get("http://localhost:4000/premium/download",{headers:{Authorization:token}});
      console.log(promise)
      if(promise.status==200){
        let a=document.createElement('a')
        a.href=promise.data.fileURL
        a.download='myexpense.csv'
        a.click()
      }
    };
  }

  function showleaderboard() {
    const inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.value = "Show Leaderboard";
    const div = document.getElementById("premium");
    div.appendChild(inputElement);
    inputElement.onclick = async () => {
      const userLeaderboard = await axios.get(
        "http://localhost:4000/premium/showleaderboard",{headers:{Authorization:token}}
      );
      let leaderboard = document.getElementById("leaderboard");
      leaderboard.innerHTML += `<h1>Leaderboard<h1>`;
      console.log(userLeaderboard.data);
      userLeaderboard.data.forEach((userDetails) => {
        leaderboard.innerHTML += `<li>-${userDetails.name} TotalExpense--${userDetails.totalExpense}</li>`;
      });
    };
  }
  async function getdata() {
    try {
      let promise = await axios.get("http://localhost:4000/expense/get", {
        headers: { Authorization: token },
      });
      console.log(promise);
      for (let i = 0; i < promise.data.length; i++) {
        display(promise.data[i]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  tableheader();
  function tableheader() {
    let table = document.getElementById("table");
    let row = table.insertRow(0);
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    cell1.innerHTML = "<b><pre> Description <b>";
    cell2.innerHTML = "<b><pre> Category <b>";
    cell3.innerHTML = "<b><pre> Amount <b>";
    cell4.innerHTML = "<b><pre> Change <b>";
  }
  function display(myObj) {
    let table = document.getElementById("table");
    let row = table.insertRow(1);
    row.className = "row";
    row.id = `${myObj.id}`;
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    cell1.innerHTML = `${myObj.desc}`;
    cell2.innerHTML = `${myObj.cat}`;
    cell3.innerHTML = `${myObj.examt}`;
    cell4.innerHTML = `<button value='e'>Edit</button><button value='d'>Delete</button></li>`;

    // let childHTML = `<li id=${myObj.id} class='list'>${myObj.examt}--------${myObj.desc}--------${myObj.cat}
    //                 <button value='e'>Edit</button><button value='d'>Delete</button></li>`;
    // parentNode.innerHTML += childHTML;
    // console.log(myObj)
    let li = document.getElementsByClassName("row");
    for (let i = 0; i < li.length; i++) {
      li[i].addEventListener("click", edit);
    }
  }
  async function edit(e) {
    let item = e.target.parentElement.parentElement;
    let id = item.id;
    if (e.target.value == "e") {
      try {
        let promise = await axios.get(
          `http://localhost:4000/expense/find/${id}`,
          { headers: { Authorization: token } }
        );
        console.log(promise);
        document.getElementById("examt").value = promise.data.examt;
        document.getElementById("desc").value = promise.data.desc;
        document.getElementById("cat").value = promise.data.cat;
        await axios.delete(`http://localhost:4000/expense/del/${id}`, {
          headers: { Authorization: token },
        });
        item.parentElement.removeChild(item);
      } catch (err) {
        console.log(err);
      }
    }
    if (e.target.value == "d") {
      try {
        let deletb = await axios.delete(
          `http://localhost:4000/expense/del/${id}`,
          { headers: { Authorization: token } }
        );
        item.parentElement.removeChild(item);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function payment(e) {
    const promise = await axios.get(
      "http://localhost:4000/purchase/premiumpay",
      { headers: { Authorization: token } }
    );
    console.log(promise.data.key_id);
    let options = {
      key: promise.data.key_id,
      order_id: promise.data.order.id,
      handler: async function (promise) {
        const res = await axios.post(
          "http://localhost:4000/purchase/updatetransaction",
          {
            order_id: options.order_id,
            payment_id: options.key,
          },
          { headers: { Authorization: token } }
        );
        alert("You are a Premium User");
        showPremium();
        localStorage.setItem("token", res.data.token);
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on("payment.failed", function (promise) {
      console.log(promise);
      alert("something went wrong");
    });
  }
});
