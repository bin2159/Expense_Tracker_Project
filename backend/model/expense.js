const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const Expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    examt:Sequelize.STRING,
    desc:Sequelize.TEXT,
    cat:Sequelize.STRING
})
module.exports=Expense