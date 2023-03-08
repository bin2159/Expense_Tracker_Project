const express=require('express')
const router=express.Router()
const sign=require('../controller/sign')
router.post('/signin',sign.in)
module.exports=router