const Expense=require('../model/expense')
const User=require('../model/user')
const sequelize=require('../util/database')
exports.getleaderboard=async (req,res,next)=>{
    try{
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
        // users.forEach(user=> {
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
