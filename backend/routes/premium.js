const express=require('express')
const router=express.Router()
const premium=require('../controller/premium')
router.get('/showleaderboard',premium.getleaderboard)
module.exports=router