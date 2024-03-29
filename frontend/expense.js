const token = localStorage.getItem("token");
let form = document.getElementById("form2");
form.addEventListener("submit", store);
const pay = document.getElementById("pay");
const page = 1;
pay.addEventListener("click", payment);
let parentNode = document.getElementById("lists");
let pagination = document.getElementById("pagination");
let pagesize
function pagelimit() {
  pagesize = document.getElementById("pagesize").value;
  if(localStorage.getItem("pagesize")){
    pagesize = localStorage.getItem("pagesize")
    document.getElementById("pagesize").value=pagesize
  }else{
  localStorage.setItem("pagesize", pagesize);
} }
pagelimit();
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
    // let promise = await axios.get(`http://localhost:4000/expense/get?page=${page}&limit=${pagesize}`, {
    //   headers: { Authorization: token },
    // });
    getdata(page);
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
    let promise = await axios.get("http://localhost:4000/premium/download", {
      headers: { Authorization: token },
    });
    console.log(promise.data.files);
    if (promise.status == 200) {
      let a = document.createElement("a");
      a.href = promise.data.fileURL;
      a.download = "myexpense.csv";
      a.click();
    }
    let parentNode=document.getElementById('leaderboard')
    parentNode.innerHTML=''
    promise.data.files.forEach((file)=>{
      parentNode.innerHTML+=`<li>${file.fileName}</li>`
    })
    
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
      "http://localhost:4000/premium/showleaderboard",
      { headers: { Authorization: token } }
    );
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = `<h1>Leaderboard<h1>`;
    console.log(userLeaderboard.data);
    userLeaderboard.data.forEach((userDetails) => {
      leaderboard.innerHTML += `<li>-${userDetails.name} TotalExpense--${userDetails.totalExpense}</li>`;
    });
  };
}

document.getElementById("pagesize").addEventListener("change", () => {
  pagesize = document.getElementById("pagesize").value;
  localStorage.setItem("pagesize", pagesize);
  localStorage.getItem('pagesize')
  getdata(page);
});
getdata(page);
async function getdata(page) {
  try {
    parentNode.innerHTML = "";
    let promise = await axios.get(
      `http://localhost:4000/expense/get?page=${page}&limit=${pagesize}`,
      {
        headers: { Authorization: token },
      }
    );
    console.log(promise);

    for (let i = 0; i < promise.data.expense.length; i++) {
      display(promise.data.expense[i]);
    }
    showpagination(promise.data.pageData);
  } catch (err) {
    console.log(err);
  }
}
function showpagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
  lastPage,
}) {
  pagination.innerHTML = "";
  if (hasPreviousPage) {
    const btn2 = document.createElement("button");
    btn2.innerHTML = previousPage;
    btn2.addEventListener("click", () => {
      deleterow();
      getdata(previousPage);
    });
    pagination.appendChild(btn2);
  }
  const btn1 = document.createElement("button");
  btn1.innerHTML = `<h3>${currentPage}</h3>`;
  btn1.addEventListener("click", () => {
    deleterow();
    getdata(currentPage);
  });
  pagination.appendChild(btn1);

  if (hasNextPage) {
    const btn3 = document.createElement("button");
    btn3.innerHTML = nextPage;
    btn3.addEventListener("click", () => {
      deleterow();
      getdata(nextPage);
    });
    pagination.appendChild(btn3);
  }
}

tableheader();
function tableheader() {
  // let table = document.getElementById("table");
  // let row = table.insertRow(0);
  // let cell1 = row.insertCell(-1);
  // let cell2 = row.insertCell(-1);
  // let cell3 = row.insertCell(-1);
  // let cell4 = row.insertCell(-1);
  // cell1.innerHTML = "<b><pre> Description <b>";
  // cell2.innerHTML = "<b><pre> Category <b>";
  // cell3.innerHTML = "<b><pre> Amount <b>";
  // cell4.innerHTML = "<b><pre> Change <b>";
}
function display(myObj) {
  // let table = document.getElementById("table");
  // let row = table.insertRow(1);
  // row.className = "row";
  // row.id = `${myObj.id}`;
  // let cell1 = row.insertCell(-1);
  // let cell2 = row.insertCell(-1);
  // let cell3 = row.insertCell(-1);
  // let cell4 = row.insertCell(-1);
  // cell1.innerHTML = `${myObj.desc}`;
  // cell2.innerHTML = `${myObj.cat}`;
  // cell3.innerHTML = `${myObj.examt}`;
  // cell4.innerHTML = `<button value='e'>Edit</button><button value='d'>Delete</button></li>`;

  let childHTML = `<li id=${myObj.id} class='list'>${myObj.examt}--------${myObj.desc}--------${myObj.cat}
                  <button value='e'>Edit</button><button value='d'>Delete</button></li>`;
  parentNode.innerHTML += childHTML;
  console.log(myObj);
  let li = document.getElementsByClassName("list");
  for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("click", edit);
  }
}
function deleterow() {
  // document.getElementById('table').innerHTML=''
  // tableheader()
  document.getElementById("lists").innerHTML = "";
}
async function edit(e) {
  let item = e.target.parentElement;
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
  const promise = await axios.get("http://localhost:4000/purchase/premiumpay", {
    headers: { Authorization: token },
  });
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
