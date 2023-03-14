const express=require('express')
const bodyParser=require('body-parser')
const Sequelize=require('./util/database')
const cors=require('cors')
const helmet=require('helmet')
const compression=require('compression')
const morgan=require('morgan')
const fs=require('fs')
const path=require('path')
require('dotenv').config()

const User=require('./model/user')
const Expense=require('./model/expense')
const Forgotpassword=require('./model/forgotpassword')
const Order=require('./model/order')
const DownloadFiles=require('./model/downloadfiles')

const enter=require('./routes/enter')
const expense=require('./routes/expense')
const payment=require('./routes/payment')
const premium=require('./routes/premium')
const password=require('./routes/password')

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
const app=express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(morgan('combined',{stream:accessLogStream}))
app.use(bodyParser.json({extended:false}))

app.use('/user',enter)
app.use('/expense',expense)
app.use('/purchase',payment)
app.use('/premium',premium)
app.use('/password',password)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword)
Forgotpassword.belongsTo(User)

User.hasMany(DownloadFiles)
DownloadFiles.belongsTo(User)

Sequelize
.sync()
.then(()=>{
    app.listen(process.env.PORT||4000)
})
.catch(err=>{
    console.log(err)
})