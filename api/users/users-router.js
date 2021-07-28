const router = require("express").Router();
const Users = require("./users-model");
const {  restricted, checkUserEdit, checkUserIdExists,  checkUsernameFree, checkUserPhoneExists } = require('../auth/auth-middleware');


//GET METHODS
//commented this end point as frontend team decided they don't need this end point for security reasons
  // router.get("/", restricted,  (req, res, next) => { // done for you
  //   Users.findAllUsers()
  //     .then(users => {
  //       res.status(200).json(users)
  //     })
  //     .catch(next);
  // });

  router.get("/:user_id", restricted, checkUserIdExists, (req, res, next) => { // done for you
    Users.findByUserId(req.params.user_id)
      .then(user => {
        res.json(user);
      })
      .catch(next);
  });

    router.get("/:user_id/plants", restricted, checkUserIdExists, (req, res, next) => { // done for you
    Users.findPlantsByUserId(req.params.user_id)
      .then(plants => {
        res.status(200).json(plants)
      })
      .catch(next);
  });

  router.get("/:username", restricted, (req,res,next)=>{
    Users.findByUsername({username:req.params.username})
    .then(user =>{
      res.status(200).json(user);
    })
    .catch(next);
  })
  
  //POST METHODS
  router.post('/', restricted, async (req, res) => {
    res.status(201).json(await Users.addUser(req.body))
  })

  //put methods
  router.put('/:user_id',restricted, checkUserEdit, checkUserIdExists, checkUsernameFree, checkUserPhoneExists,async (req, res, next) => {
    const user_id = parseInt(req.params.user_id);
    const contents = req.body;
    try {
      const editedUser = await Users.updateUser(user_id, contents);
      res.json(editedUser);
    } catch (err) {
      next(err);
    }
  }
);

  module.exports = router;
  