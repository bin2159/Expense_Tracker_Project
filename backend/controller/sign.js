const User=require('../model/user')
exports.in=(req,res,next)=>{
   console.log(req.body)
   const name=req.body.name
   const email=req.body.email
   const pass=req.body.pass 
   User.create({
    name:name,
    email:email,
    pass:pass
   })
   .then(()=>{
    res.json('success')
   })
   .catch(err=>{
      res.json('failed')
    console.log(err)
   })
}
