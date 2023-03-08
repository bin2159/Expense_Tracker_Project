const express=require('express')
const router=express.Router()
const cexp=require('../controller/expense')
router.get('/get',cexp.get)
router.post('/post',cexp.post)
router.get('/find/:id',cexp.find)
router.delete('/del/:id',cexp.del)
module.exports=router