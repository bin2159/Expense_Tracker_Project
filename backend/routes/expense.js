const express=require('express')
const router=express.Router()
const userauthenticate = require('../middleware/auth')
const cexp=require('../controller/expense')
router.get('/get',userauthenticate.authenticate,cexp.get)
router.post('/post',userauthenticate.authenticate,cexp.post)
router.get('/find/:id',userauthenticate.authenticate,cexp.find)
router.delete('/del/:id',userauthenticate.authenticate,cexp.del)
module.exports=router