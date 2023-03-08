const express=require('express')
const bodyParser=require('body-parser')
const Sequelize=require('./util/database')
const enter=require('./routes/enter')
const expense=require('./routes/expense')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(bodyParser.json({extended:false}))
app.use('/user',enter)
app.use('/expense',expense)
Sequelize
.sync()
.then(()=>{
    app.listen(4000)
})
.catch(err=>{
    console.log(err)
})