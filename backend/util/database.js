const Sequelize = require("sequelize")
const sequelize=new Sequelize('new-schema3','root','2159',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize