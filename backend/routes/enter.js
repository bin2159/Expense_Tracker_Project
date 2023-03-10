const express=require('express')
const router=express.Router()
const sign=require('../controller/sign')
router.post('/signin',sign.login)
router.post('/login',sign.log)
module.exports=router