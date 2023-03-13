const Expense = require("../model/expense");
const User = require("../model/user");
const { transaction } = require("../util/database");
const sequelize = require("../util/database");
const Userservices = require("../service/userservices");

exports.get = async (req, res, next) => {
  try {
    const page = req.query.page;
    const ITEMS_PER_PAGE = Number(req.query.limit);
    // let exp = await Userservices.getExpenses(req,{ where: { userId: req.user.id } });
    // res.status(200).json(exp);
    let totalItems=await Expense.count({where:{userId:req.user.id}})
    let expense = await Userservices.getExpenses(req,{
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      where: { userId: req.user.id}
    })
    res.json({
      expense: expense,
      pageData:{currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: Number(page) + 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),}
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, error: err });
  }
};
exports.post = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { examt, desc, cat } = req.body;
    console.log(req.body)
    let exp = await Userservices.create(req,
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
    console.log(err)
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
  const t = await sequelize.transaction();
  console.log(req.params.id);
  try {
    const id = req.params.id;
    let exp = await Expense.findByPk(id);
    const totalExpense = Number(req.user.totalExpense) - Number(exp.examt);
    await User.update(
      {
        totalExpense: totalExpense,
      },
      { where: { id: req.user.id }, transaction: t }
    );
    exp.destroy({ where: { userId: req.user.id } });
    await t.commit();
    res.status(200).json({ success: true, message: "DELETED" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ success: false, error: err });
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
