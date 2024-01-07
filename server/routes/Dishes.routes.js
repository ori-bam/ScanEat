const express = require('express');
const router = express.Router();
const checkAuth=require("../Middlewares/check.Auth")
const cyber=require('../Middlewares/cyber')
const mongoose=require('mongoose');
const { Dish } = require('../DL/Models/dish.model');

router.get('/', (req, res) => {
  Dish.find()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
});

router.post('/addMany', (req, res) => {
    const newDishes = req.body.map((dish) => ({
      _id: new mongoose.Types.ObjectId(),
      ...dish,
    }));
  
    Dish.insertMany(newDishes)
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: 'POST /Dish',
          dishes: result,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
  });
  
router.post('/add', (req, res) => {
    let { name,description,price,image,category,restaurantId, restName} = req.body;
    const newDish = new Dish({
    _id: new mongoose.Types.ObjectId(),
        name,
        description,
        price,     
        image,
        category,
        restaurantId,
        restName
    });
 
    newDish.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "POST /Dish",
            dish: result
        })
    })
})

    router.delete('/del/:id',(req, res) => {
        const id = req.params.id;
        console.log(id)
        Dish.remove({_id: id}).then(result=>{
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
        let updateDish = {};
        for (const key in req.body) {
            updateDish[key] = req.body[key];
        }
        Dish.updateOne({_id: id},{$set:updateDish}).then(result=>{
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

    router.get('/:id', (req, res) => {
        const restaurantId = req.params.id;
        Dish.find({ restaurantId: restaurantId })
            .then(docs => {
               
                if (docs.length > 0) {
                    res.status(200).json(docs);
                    console.log(docs);
                } else {
                    res.status(404).json({ message: 'No dishes found for the given restaurant ID' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
    });


module.exports = router;
