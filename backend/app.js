const express=require('express')
const bodyParser=require('body-parser')
const Sequelize=require('./model/user')
const enter=require('./routes/enter')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(bodyParser.json({extended:false}))
app.use('/user',enter)
Sequelize
.sync()
.then(()=>{
    app.listen(4000)
})
.catch(err=>{
    console.log(err)
})