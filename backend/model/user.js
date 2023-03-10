const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true,
        primaryKey:true
    },
    pass:Sequelize.STRING,
    ispremium:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    totalExpense:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
})
module.exports=User