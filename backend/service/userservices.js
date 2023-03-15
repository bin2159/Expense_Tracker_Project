
const getExpenses=(req,where)=>{
    return req.user.getExpenses(where)
}
const create=(req,data,t)=>{
    return req.user.createExpense(data,t)
}
const getExpense=(req,where)=>{
    return req.user.getExpense(where)
}
const update=()=>{
    
}
const findByPk=(req,id)=>{
    return res.user.getExpense({where:{userId:res.user.id}})
}
module.exports={
    getExpenses,
    create,
    getExpense,
    findByPk,
    update
}