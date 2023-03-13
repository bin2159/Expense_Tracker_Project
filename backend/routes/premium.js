const express=require('express')
const router=express.Router()
const premium=require('../controller/premium')
const userauthenticate=require('../middleware/auth')
router.get('/showleaderboard',userauthenticate.authenticate,premium.getleaderboard)
router.get('/download',userauthenticate.authenticate,premium.download)
module.exports=router