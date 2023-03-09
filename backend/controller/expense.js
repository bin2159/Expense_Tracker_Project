const Expense=require('../model/expense')
exports.get=(req,res,next)=>{
    Expense.findAll({where:{userId:req.user.id}})
    //req.user.getExpenses()
    .then(exp=>{
        res.json(exp)
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.post=(req,res,next)=>{
    const {examt,desc,cat}=req.body
    //req.user.createExpense
    Expense.create({examt,desc,cat,userId:req.user.id})
    .then(()=>{
        res.json('succuss')
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.find=(req,res,next)=>{
    const id=req.params.id
    Expense.findByPk(id,{where:{userId:req.user.id}})
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
        exp.destroy({where:{userId:req.user.id}})
        res.json('Deleted')
    })
    .catch(err=>{
        console.log(err)
    })
}
// exports.del=(req,res,next)=>{
//     const id=re.params.id
//     Expense.destroy({where:{id:id,userId:req.user.id}})
//     .then(()=>{
//         req.status(200).json({success:true})
//     })
//     .catch((err)=>{
//         return res.status(500).json({success:false,error:err})
//     })
// }