const router = require("express").Router();
const Users = require("./users-model");



// router.get('/api/users', async (req, res) => {
//     res.json(await getAllUsers())
//   })
  
//POST METHODS
  router.post('/', async (req, res) => {
    res.status(201).json(await Users.add(req.body))
  })

  //GET METHODS
  router.get("/",  (req, res, next) => { // done for you
    Users.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next);
  });

  router.get("/:user_id",  (req, res, next) => { // done for you
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
  
  router.get("/:user_phone",  (req, res, next) => { // done for you
    Users. findByPhone(req.params.user_phone)
      .then(user => {
        res.json(user);
      })
      .catch(next);
  });

  module.exports = router;
  