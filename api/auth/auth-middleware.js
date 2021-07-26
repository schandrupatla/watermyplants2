const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("./secrets");
const db = require("../users/users-model")

async function restricted(req,res,next) {
  const token = req.headers.authorization
  if (!token || token === undefined || token === "") {
        return next({ status: 401, message: 'token required' })
     }
     jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
           if (err) {
             return next({ status: 401, message: `token invalid`})
           }
           req.decodedJwt = decodedToken
     next()
   })
  next();
}

//must not exist already in the `users` table
async function checkUsernameExists(req, res, next) {
    try{
       const users = await db.findBy({username:req.body.username})
       if(users.length){
         req.user =users[0]
         next()
       }
       else{
         next({
           status:401,
           message:"Invalid credentials"
         })
       }
    }
    catch(err){
      next(err)
    }
   
   }

// On FAILED registration due to `username` or `password` missing from the request body,
// the response body should include a string exactly as follows: "username and password required".
function checkPayload(req, res, next) {
    if(req.body.username === undefined || req.body.username === "" ||req.body.password === undefined || req.body.password === "" ||req.body.user_phone === undefined || req.body.user_phone === ""){
      res.status(422).json({message:"username, password and phone are required"});
    }
    else{
      next();
    }
  }
//On FAILED registration due to the `username` being taken,
async function checkUsernameFree(req, res, next) {
    try{
        const users = await db.findBy({username:req.body.username}) //as good as passing where("username", username)
        if(!users.length){
          next()
        }else{
          next({status:422,
          message:"username taken"})
        }    
      }//try
      catch(err){
        next(err);
      }
  }

  async function checkUserPhoneExists(req, res, next) {
    try{
       const users = await db.findByPhone({user_phone:req.body.user_phone})
       if(!users.length){
         //req.user =users[0]
         next()
       }
       else{
         next({
           status:422,
           message:"Phone number already exists"
         })
       }
    }
    catch(err){
      next(err)
    }
   
   }


  module.exports = {
    restricted,
    checkPayload,
    checkUsernameExists,
    checkUsernameFree,
    checkUserPhoneExists

    }