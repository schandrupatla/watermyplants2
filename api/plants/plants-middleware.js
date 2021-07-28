const db = require("./plants-model");
const Users = require("../users/users-model")


function checkPlantsPayload(req, res, next) {
    const { plant_nickname, plant_species, h2ofrequency, user_id } = req.body;
  
    if (
        plant_nickname === undefined ||  plant_nickname.trim() === "" ||
        plant_species === undefined || plant_species.trim() === "" ||
        h2ofrequency === undefined ||  h2ofrequency === "" ||
        user_id === undefined ||  user_id === "" 
    ) {
      res
        .status(400)
        .json({ message: "plant_nickname, plant_species, h2ofrequency and user_id are required" });
    } 
    else {
      req.user = {
        plant_nickname: plant_nickname.trim(),
        plant_species: plant_species.trim(),
        h2ofrequency: h2ofrequency,
        user_id:user_id
      };
      next();
    }
  }  

  //must exist already in the `users` table
async function checkPlantIdExists(req, res, next) {
    try {
      const plant = await db.getPlantByPlantId(req.params.plant_id);
      if (plant !== undefined) {
        req.plant = plant[0];
        next();
      } else {
        next({
          status: 401,
          message: `Given plant_id:${req.params.plant_id} does not exists in the plants table`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  
  async function checkPlantNicknameFree(req, res, next) {
    try {
      const plant = await db.getByNickname({ plant_nickname: req.body.plant_nickname }); 
      if (!plant.length) {
        next();
      } else {
        next({ status: 422, message: "plant_nickname lready exists in the plants table" });
      }
    } catch (err) {
      //try
      next(err);
    }
  }

  //must exist already in the `users` table
async function checkPlantUserIdExists(req, res, next) {
    try {
      const users = await Users.findByUserId(req.body.user_id);
      if (users !== undefined) {
        req.user = users[0];
        next();
      } else {
        next({
          status: 401,
          message: `Given user_id:${req.body.user_id} does not exists in the users table`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  module.exports = {
    checkPlantsPayload,
    checkPlantIdExists,
    checkPlantNicknameFree,
    checkPlantUserIdExists
  };
  