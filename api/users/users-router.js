const router = require("express").Router();
const Users = require("./users-model");
const { restricted, only } = require("../auth/auth-middleware");


// router.get('/api/users', async (req, res) => {
//     res.json(await getAllUsers())
//   })
  
//   router.post('/api/users', async (req, res) => {
//     res.status(201).json(await insertUser(req.body))
//   })

  router.get("/api/users",  (req, res, next) => { // done for you
    Users.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next);
  });
  
  router.get("/:user_id", restricted, only('admin'), (req, res, next) => { // done for you
    Users.findById(req.params.user_id)
      .then(user => {
        res.json(user);
      })
      .catch(next);
  });
  
  router.get("/:username", (req,res,next)=>{
    Users.findBy(req.param.username)
    .then(users =>{
      res.status(200).json(users);
    })
    .catch(next);
  })
  
  module.exports = router;
  