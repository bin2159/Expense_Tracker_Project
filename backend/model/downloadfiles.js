const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const Downloadfiles=sequelize.define('downloadfiles',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    fileUrl:Sequelize.TEXT,
    name:Sequelize.STRING
})
module.exports=Downloadfiles