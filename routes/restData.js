const express = require('express');
const router = express.Router();
const restData = require('../models/restdata');

async function getData(req,res,next){
    let data
    try{
        data = await restData.findById(req.params.id);
        if(data == null){
            return res.status(404).json({message:'cannot find data'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.data = data
    next()
}


router.get('/',async(req,res)=>{
    try{
        const data = await restData.find()
        res.json(data)
    } catch(err){
        res.status(500).json({message:err.message})
    }
});

router.get('/:id',getData,(req,res)=>{
    res.send(res.data)
})

router.post('/',async(req,res)=>{
    const data = new restData({
        name:req.body.name,
        emailId : req.body.emailId
    })
    try{
        const newData = await data.save()
        res.status(201).json(newData)
    }catch(err){
        res.status(400).json({message:err.message})
    }

})

router.patch('/:id',getData,async(req,res)=>{
    if(req.body.name != null){
        res.data.name = req.body.name
    }
    if(req.body.emailId != null){
        res.data.emailId = req.body.emailId
    }

    try{
        const updateddata = await res.data.save();
        res.json(updateddata)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.delete('/:id',getData,async(req,res)=>{
    try{
        await res.data.remove()
        res.json({message:'data deleted'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})



module.exports = router