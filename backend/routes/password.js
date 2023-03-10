const express=require('express')
const router=express.Router()
const forgot=require('../controller/forgotpassword')
router.post('/forgotpassword',forgot.forgotpassword)
router.get('/updatepassword/:resetpasswordid',forgot.updatepassword)
router.get('/resetpassword/:id',forgot.resetpassword)
module.exports=router