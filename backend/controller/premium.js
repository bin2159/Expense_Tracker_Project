const Expense=require('../model/expense')
const User=require('../model/user')
const sequelize=require('../util/database')
const S3services=require('../service/S3services')
const Downloadfiles=require('../model/downloadfiles')
async function getleaderboard(req,res,next){
    try{
        // const user=await User.findAll()
        // const expense=await Expense.findAll()     
        // const userAggrregatedExpenses={}
        // expense.forEach(exp=>{
        //     if(userAggrregatedExpenses[exp.userId]){
        //         userAggrregatedExpenses[exp.userId]=userAggrregatedExpenses[exp.userId]+ Number(exp.examt)
        //     }
        //     else{
        //         userAggrregatedExpenses[exp.userId]=exp.examt
        //     }
        // }) 
        // const userLeaderboardDetails=[]
        // user.forEach(user=>{
        //     userLeaderboardDetails.push({name:user.name,totalExpense:userAggrregatedExpenses[user.id]})
        // })
        const leaderboardofusers= await User.findAll({
            // attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.examt')),'total_cost']],
            // include:[{model:Expense,attributes:[]}],
            // group:['user.id'],
            // order:[['total_cost','DESC']]
            attributes:['name','totalExpense'],
            order:[['totalExpense','DESC']]
        })
        // const userAggrregatedExpenses={}
        // console.log(expenses)
        // let userLeaderboardDetails=[]
        // leaderboardofusers.forEach(user=> {
        //     userLeaderboardDetails.push({name:user.name,total_cost:userAggrregatedExpenses})
        // });
        // userLeaderboardDetails.sort((a,b)=>b.total_cost-a.total_cost)
        res.status(200).json(leaderboardofusers)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
//npm i aws-sdk


async function download(req,res,next){
    try{
    const expenses=await req.user.getExpenses()
    const stringifiedExpenses=JSON.stringify(expenses)
    const userId=req.user.id
    const filename=`Expense${userId}/${new Date()}`
    const fileURL=await S3services.uploadToS3(stringifiedExpenses,filename)
    await Downloadfiles.create({
        fileUrl:fileURL,
        userId:userId
    })
    res.status(200).json({fileURL,success:true})
}
    catch(err){
        res.status(500).json({fileURL:'',success:false,error:err})
    }
}  
module.exports={
    download,
    getleaderboard
}