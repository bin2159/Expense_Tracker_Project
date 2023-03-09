const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
exports.in = async (req, res, next) => {
  try {
    const { name, email, pass } = req.body;
    bcrypt.hash(pass, 10, async (err, hash) => {
      console.log(err);
      User.create({ name, email, pass: hash })
      .then(()=>{
         res.status(200).json({ message: "Account created Successfully" })})
      .catch(err=>{
         res.status(401).json({message:"User Already Exist"});
      })
    });
  } catch (err) {
    req.status(500).json({success:false,message:"Something went wrong"})
  }
};

function generateToken(id){
  return jwt.sign({userid:id},'secretkey')
}
exports.log = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      bcrypt.compare(pass,user.pass,(err,respose)=>{
         if(err){
            throw new Error('Something Went Wrong')
         }
         if(respose){
            res.status(200).json({ success: true, message: "User logged in sccussfully",token:generateToken(user.id)});
          } else {
            res.status(400).json({ success: false, message: "Incorrect Password" });
          }
      }) 
    } else {
      res.status(404).json({ success: false, message: "User Does not Exist" });
    }
  } catch (err) {
    res.status(500).json({message:err,success:false})
  }
  // const email=req.body.email
  // const pass=req.body.pass
  // User.findOne({where:{email:email}})
  // .then(user=>{
  //    if(user.pass==pass){
  //       res.json('success')
  //    }
  //    else{
  //       res.status(401).send()
  //    }
  // })
  // .catch(err=>{
  //    console.log(err)
  //    res.status(404).send()
  // })
};
