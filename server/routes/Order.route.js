const express = require('express');
const router = express.Router();

const Orders=require('../DL/Models/order.model');
const mongoose=require('mongoose');
const User =require("../DL/Models/customer.model")
const cyber = require("../Middlewares/cyber")




router.get('/',(req,res)=>{
    Orders.find().then(docs=>{
        console.log(docs)
        res.status(200).json(docs);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            error: error
        });
    })
})


router.post('/add',   (req, res) => {
    const {userId, username, restaurantName, dishes, date, price } = req.body;
  
    const newOrder = new Orders();
    newOrder._id = new mongoose.Types.ObjectId();
    newOrder.userId=userId;
    newOrder.username = username;
    newOrder.restaurantName = restaurantName;
    newOrder.dishes = dishes;
    newOrder.date = date;
    newOrder.price = price;
  
    newOrder.save()
    .then(result => {
      console.log(result);
      // Update user's history array
      User.findOneAndUpdate(
        { _id: userId },
        { $push: { history:newOrder } },
        { new: true }
      ).exec((error, updatedUser) => {
        if (error) {
          res.status(500).json({ error: "Failed to update user's history" });
        } else {
          res.status(201).json({
            message: "POST /Order",
            order: result._id
          });
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to save order" });
    });
  });
  

    router.delete('/del/:id', (req, res) => {
        const id = req.params.id;
        Orders.remove({_id: id}).then(result=>{
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
    router.put('/upd/:id', (req, res) => {
        const id = req.params.id;
        let updateOrder = {};
        for (const key in req.body) {
            updateOrder[key] = req.body[key];
        }
        Orders.updateOne({_id: id},{$set:updateOrder}).then(result=>{
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
        Orders.findById(id).then(doc=>{
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
