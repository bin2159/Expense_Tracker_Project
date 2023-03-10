const uuid=require('uuid')
const Sib=require('sib-api-v3-sdk')
const bcrypt=require('bcrypt')

const User=require('../model/user')
const Forgotpassword=require('../model/forgotpassword')

const forgotpassword=async (req,res,next)=>{
    try{
        const {email}=req.body
        console.log(req.body)
        const user=await User.findOne({where:{email}})
        if(user){
            const id=uuid.v4()
            user.createForgotpassword({id,active:true})
            .catch(err=>{
                throw new Error(err)
            })
            const client=Sib.ApiClient.instance
            const apiKey=client.authentications['api-key']
            apiKey.apiKey='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'
            const apiInstance=new Sib.TransactionalEmailsApi()
            apiInstance.sendTransacEmail({
                to:[{email:email}],
                sender:{email:"bipinthms007.bst@gmail.com"},
                subject:"Sending with Send in blue",
                textContent:"Click the attached link",
                htmlContent:`<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`
            })
            .then((respose)=>{return res.status(200).json({message:'Link to reset password send'})})
            .catch(err=>{throw new Error(err)})
        }else{
            throw new Error('User doesnt exist')
        }
    
    }
    catch(err){
        console.log(err)
        return res.json({message:err,success:false})
    }   
}
const resetpassword=(req,res,next)=>{
    const id=req.params.id
    Forgotpassword.findOne({where:{id}}).then(forgotpasswordrequest=>{
        if(forgotpassword){
            forgotpasswordrequest.update({active:false})
            res.status(200).send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>
            <form action="http://localhost:4000/password/updatepassword/${id}" method="GET">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
        </html>`)
        res.end()
        }
    })
}
const updatepassword=(req,res,next)=>{
    try{
        const {newpassword}=req.query
        console.log('req.quere>>>>>>>>>>>>>>',req.query)
        const {resetpasswordid}=req.params
        Forgotpassword.findOne({where:{id:resetpasswordid}})
        .then(resetpasswordrequest=>{
            User.findOne({where:{id:resetpasswordrequest.userId}})
            .then(user=>{
                if(user){
                    const saltRounds=10
                    bcrypt.genSalt(saltRounds,function(err,hash){
                        if(err){
                            console.log(err)
                            throw new Error(err)
                        }
                        bcrypt.hash(newpassword,saltRounds,function(err,hash){
                            if(err){
                                console.log(err)
                                throw new Error(err)
                            }
                            user.update({pass:hash})
                            .then(()=>{
                                console.log('updated')
                            res.status(201).json({message:'Successfuly update the new  password'})
                        })
                        })
                    })
                }else{
                    return res.status(404).json({error:'No user Exist',success:false})
                }
            })
        })

    }catch(err){
        return res.status(404).json({error,success:false})
    }
}
module.exports={
    forgotpassword,updatepassword,resetpassword
}