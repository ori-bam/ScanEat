const express = require('express');
const router = express.Router();
const checkAuth=require("../Middlewares/check.Auth")
const User=require('../DL/Models/customer.model');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const cyber = require("../Middlewares/cyber")





router.get('/:id',(req,res)=>{
    const id = req.params.id;
    User.findById(id).then(doc=>{
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


router.get('/',(req,res)=>{
    User.find().then(docs=>{
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



router.post('/register', (req, res) => {
  let { name,authLevel, password, phone, email, birthday } = req.body;

  User.find({ email }).then((users) => {
    if (users.length >= 1) {
      return res.status(409).json({
        message: 'Email exists'
      });
    }

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({
          error: error.message
        });
      }

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        password: hash,
        authLevel:authLevel,
        phone: phone,
        email: email,
        birthday: birthday,
        history:[]
      });

      newUser
        .save()
        .then(result => {
         
       
          const token = cyber.createToken(result);
            
          res.status(201).json({
            message: "User created",
            user: result,
            token: token
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error: error
          });
        });
    });
  });
});

  
  
  
router.post('/clear-history/:id',  (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndUpdate(
      id,
      { $set: { history: [] } },
      { new: true }
    )
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
  });

router.delete('/del/:id',cyber.checkAuth, (req, res) => {
    const id = req.params.id;
    User.remove({_id: id}).then(result=>{
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
router.put('/upd/:id',cyber.checkAuth, (req, res) => {
    const id = req.params.id;
    let updateUser = {};
    for (const key in req.body) {
        updateUser[key] = req.body[key];
    }
    User.updateOne({_id: id},{$set:updateUser}).then(result=>{
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



router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.find({ email }).then((users) => {
        if (users.length === 0) {

            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        const [user] = users;

        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                console.log(result)
                const token = cyber.createToken(user);
                return res.status(200).json({
                    message: 'Auth successfull',
                    token :token
                   
                })
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        })
    })
})


module.exports = router;