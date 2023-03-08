window.addEventListener('DOMContentLoaded',()=>{
    let form=document.getElementById('form2')
form.addEventListener('submit',store)
let parentNode=document.getElementById('lists')
getdata()
async function store(e){
    e.preventDefault()
    let examt=document.getElementById('examt').value
    let desc=document.getElementById('desc').value
    let cat=document.getElementById('cat').value
    let myObj={
        examt:examt,
        desc:desc,
        cat:cat
    }
    try{
        await axios.post('http://localhost:4000/expense/post',myObj)
        let promise=await axios.get('http://localhost:4000/expense/get')
        display(promise.data[promise.data.length-1])
    }
    catch(err){
        console.log(err)
    }
}
async function getdata(){
    try{
        let promise=await axios.get('http://localhost:4000/expense/get')
        for(let i=0;i<promise.data.length;i++){
            display(promise.data[i])
        }
    }
    catch(err){

    }
}
async function display(myObj){
    let childHTML=`<li id=${myObj.id} class='list'>${myObj.examt}--------${myObj.desc}--------${myObj.cat}
                    <button value='e'>Edit</button><button value='d'>Delete</button></li>`
    parentNode.innerHTML+=childHTML
    let li=document.getElementsByClassName('list')
    for(let i=0;i<li.length;i++){
        li[i].addEventListener('click',edit)
    }
}
async function edit(e){
    console.log('hai')
    let item=e.target.parentElement
    let id=item.id
    if(e.target.value=='e'){
        try{
            let promise=await axios.get(`http://localhost:4000/expense/find/${id}`)
            console.log(promise)
            document.getElementById('examt').value=promise.data.examt
            document.getElementById('desc').value=promise.data.desc
            document.getElementById('cat').value=promise.data.cat
            await axios.delete(`http://localhost:4000/expense/del/${id}`)
            parentNode.removeChild(item)
        }
        catch(err){
            console.log(err)
        }
    }
    if(e.target.value=='d'){
        try{
            await axios.delete(`http://localhost:4000/expense/del/${id}`)
            parentNode.removeChild(item)
        }
        catch(err){
            console.log(err)
        }
    }
}
})
