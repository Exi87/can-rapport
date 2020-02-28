const express = require('express');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

const auth = require('../midleware/auth')
const { check, validationResult } = require("express-validator");
//bring the user model
const User = require("../models/User");
//@route  Get /api/auth
//@desc get logged in user
//@access private
router.get('/', auth, async (req, res)=>{
  try {
    let user = await User.findById(req.user.id).select('-password')
    res.json( user)
   } catch (err) {
       console.error(err.message);
       
       res.status(500).send('Server Error')
   }
})



//@route  Post /api/auth
//@desc Auth user & get the token
//@access public
router.post('/', [
    check('email', ' email is require').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
      }
       const {email, password} = req.body;

      try {
          let user =await User.findOne({email});
          if(!user){
            res.status(400).json({ msg: 'Invalid Credentials for email' })
          }

          const isMatch= await bcrypt.compare(password, user.password);

          if(!isMatch){
            res.status(400).json({ msg: 'Invalid Credentials for password' })
          }

          const payload={
            user:{
              id:user.id
            }
          }

          jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn:360000
          }, (err, token)=>{
            if(err) throw err

            res.json({token})
          })




      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
          
      }

    
})


module.exports = router