const Expense = require("../model/expense");
const User = require("../model/user");
const sequelize = require("../util/database");
exports.get = async (req, res, next) => {
  try {
    let exp = await Expense.findAll({ where: { userId: req.user.id } });
    res.status(200).json(exp);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};
exports.post = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { examt, desc, cat } = req.body;
    let exp = await Expense.create(
      { examt, desc, cat, userId: req.user.id },
      { transaction: t }
    );
    const totalExpense = Number(req.user.totalExpense) + Number(exp.examt);
    let user = await User.update(
      { totalExpense: totalExpense },
      { where: { id: req.user.id }, transaction: t }
    );
    await t.commit();
    res.status(200).json({ expense: exp });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ success: false, error: err });
  }
};

exports.find = async (req, res, next) => {
  try {
    const id = req.params.id;
    let exp = await Expense.findByPk(id, { where: { userId: req.user.id } });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
exports.del = async (req, res, next) => {
  try {
    const id = req.params.id;
    let exp = await Expense.findByPk(id);
    exp.destroy({ where: { userId: req.user.id } });
    res.status(200).json({ success: true, message: "DELETED"});
  } catch (err) {
    res.status(500).json({success:false,error:err})
  }
};
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
