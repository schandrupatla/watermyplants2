const router = require("express").Router();
const Plants = require("./plants-model");
const {  restricted } = require('../auth/auth-middleware');
const { checkPlantsPayload, checkPlantIdExists, checkPlantNicknameFree, checkPlantUserIdExists  } = require('./plants-middleware');

  //GET METHODS

  router.get("/", restricted, (req, res, next) => { // done for you
    Plants.getAllPlants()
      .then(plants => {
        res.status(200).json(plants)
      })
      .catch(next);
  });


  router.get("/:plant_id", restricted, checkPlantIdExists,(req, res, next) => { // done for you
    Plants.getPlantByPlantId(req.params.plant_id)
      .then(plants => {
        res.status(200).json(plants).first()
      })
      .catch(next);
  });
 
  //POST METHODS
  router.post('/', restricted, checkPlantsPayload, checkPlantNicknameFree, checkPlantUserIdExists, async (req, res, next) => {
    try{
      res.status(201).json(await Plants.addPlant(req.body))
    }
    catch(err){
      next(err)
    }
    
  })

//put methods
router.put('/:plant_id',restricted, checkPlantsPayload, checkPlantNicknameFree, checkPlantUserIdExists, async (req, res, next) => {
    const plant_id = parseInt(req.params.plant_id);
    const contents = req.body;
    try {
      const editedPlant = await Plants.updatePlant(plant_id, contents);
      res.json(editedPlant);
    } catch (err) {
      next(err);
    }
  }
);

  //delete methods
  router.delete('/:plant_id', restricted, checkPlantIdExists, async(req,res,next)=>{
    const plant_id = parseInt(req.params.plant_id);
    try{
      let dPlant = await Plants.deletePlant(plant_id)
     console.log("deleted record:", dPlant)
     res.status(200).json(dPlant)
    }
    catch(err){
      next(err);
    }
    
  });

  module.exports = router;
  