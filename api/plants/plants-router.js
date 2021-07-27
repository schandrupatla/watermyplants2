const router = require("express").Router();
const Plants = require("./plants-model");
const {  restricted } = require('../auth/auth-middleware');

  //GET METHODS

  router.get("/", restricted, (req, res, next) => { // done for you
    Plants.getAllPlants()
      .then(plants => {
        res.status(200).json(plants)
      })
      .catch(next);
  });


  // router.get("/:user_id", restricted, (req, res, next) => { // done for you
  //   Plants.getPlantsByUserId(req.params.user_id)
  //     .then(plants => {
  //       res.status(200).json(plants).first()
  //     })
  //     .catch(next);
  // });

  
  // router.get("/:plant_species", restricted, (req, res, next) => { // done for you
  //   Plants.getBySpeciesname({plant_species:req.params.plant_species})
  //     .then(plant => {
  //       res.json(plant);
  //     })
  //     .catch(next);
  // });
 
  //POST METHODS
  router.post('/', restricted, async (req, res) => {
    res.status(201).json(await Plants.addPlant(req.body))
  })
//put methods
router.put('/:plant_id', async (req, res, next) => {
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
  router.delete('/:plant_id', restricted, async(req,res,next)=>{
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
  