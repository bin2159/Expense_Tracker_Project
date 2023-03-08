const Expense=require('../model/expense')
exports.get=(req,res,next)=>{
    Expense.findAll()
    .then(exp=>{
        res.json(exp)
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.post=(req,res,next)=>{
    const {examt,desc,cat}=req.body
    Expense.create({examt,desc,cat})
    .then(()=>{
        res.json('succuss')
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.find=(req,res,next)=>{
    const id=req.params.id
    Expense.findByPk(id)
    .then(exp=>{
        res.json(exp)
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.del=(req,res,next)=>{
    const id=req.params.id
    Expense.findByPk(id)
    .then(exp=>{
        exp.destroy()
        res.json('Deleted')
    })
    .catch(err=>{
        console.log(err)
    })
}