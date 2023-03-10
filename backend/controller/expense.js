const Expense=require('../model/expense')
const User=require('../model/user')
exports.get=(req,res,next)=>{
    Expense.findAll({where:{userId:req.user.id}})
    //req.user.getExpenses()
    .then(exp=>{
        console.log(exp)
        res.json(exp)
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.post=(req,res,next)=>{
    const {examt,desc,cat}=req.body
    console.log(req.body)
    //req.user.createExpense
    Expense.create({examt,desc,cat,userId:req.user.id})
    .then((exp)=>{
        const totalExpense=Number(req.user.totalExpense)+Number(exp.examt)
        console.log(req.user.id)
        User.update(
            {totalExpense:totalExpense},
            {where:{id:req.user.id}})
        .then(()=>{
            res.status(200).json({expense:exp})
        })
        .catch(err=>{
            return  res.status(500).json({success:false,error:err})
        })
    })
    .catch(err=>{
        return res.status(500).json({success:false,error:err})
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