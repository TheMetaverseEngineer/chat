const User = require("../model/userModel")
const brcypt = require("bcrypt");

module.exports.register = (req , res, net) => {

   const {username , email , password } = req.body;
   const usernameCheck = await 

};