
const getExpenses=(req,where)=>{
    return req.user.getExpenses(where)
}
const create=(req)=>{
    return req.user.createExpense()
}
const getExpense=(req,where)=>{
    return req.user.getExpense(where)
}
const update=()=>{

}
const findByPk=(req,id)=>{
    return res.user.getExpense()
}
module.exports={
    getExpenses,
    create,
    getExpense
}