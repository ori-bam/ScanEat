const express = require('express');
const router = express.Router();
const checkAuth=require("../Middlewares/check.Auth")
const Resturants=require('../DL/Models/resturant.model');
const mongoose=require('mongoose');
const cyber=require("../Middlewares/cyber")

router.get('/',(req,res)=>{
    console.log("hii");
    Resturants.find().then(docs=>{
        console.log(docs.length)
        res.status(200).json(docs);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            error: error
        });
    })
})



router.post('/add', cyber.checkAuth,(req, res) => {
    let { name,address,desc, image , phone } = req.body;
    const  newResturant = new Resturants({
    _id: new mongoose.Types.ObjectId(),
        name,
        address,
        desc,
        image,
        phone    
        
    });
 
    newResturant.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "POST /Resturant",
            resturant: result
        })
    })
})

    router.delete('/del/:id',cyber.checkAuth, (req, res) => {
        const id = req.params.id;
        Resturants.remove({_id: id}).then(result=>{
            console.log(result)
            res.status(200).json(result)
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
                error: error
            });
        })
    });
    router.put('/upd/:id', cyber.checkAuth,(req, res) => {
        const id = req.params.id;
        let updateResturant = {};
        for (const key in req.body) {
            updateResturant[key] = req.body[key];
        }
        Resturants.updateOne({_id: id},{$set:updateResturant}).then(result=>{
            console.log(result)
            res.status(200).json(result)
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
                error: error
            });
        })
    });

    router.get('/:id',(req,res)=>{
        const id = req.params.id;
        Resturants.findById(id).then(doc=>{
            console.log(doc);
            if(doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: 'Not Found' })
            }
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
                error: error
            });
        })
    })


module.exports = router;
