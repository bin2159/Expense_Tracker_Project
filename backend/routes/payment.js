const express=require('express')
const router=express.Router()
const pay=require('../controller/purchase')
const userauthenticate=require('../middleware/auth')
router.get('/premiumpay',userauthenticate.authenticate,pay.purchasepremium)
router.post('/updatetransaction',userauthenticate.authenticate,pay.updatetransaction)
module.exports=router