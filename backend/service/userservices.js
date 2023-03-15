
const getExpenses=(req,where)=>{
    return req.user.getExpenses(where)
}
const create=(req,data,t)=>{
    return req.user.createExpense(data,t)
}
const getExpense=(req,where)=>{
    return req.user.getExpense(where)
}
const update=(req)=>{
    return req.user.update()
}
const findByPk=(req,id)=>{
    return req.user.getExpense({where:{userId:id}})
}
module.exports={
    getExpenses,
    create,
    getExpense,
}