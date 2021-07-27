const db = require('../data/db-config');

//Read Methods

async function getAllPlantsByUser() {  
        let results = await db("plants")
          return results         
  }

function getPlantsByUserId(user_id) {  
    return db("plants as p")
    .select("u.user_id","u.username","p.plant_id","p.plant_nickname","p.plant_species" ,"p.h2ofrequency" )
    .join("users as u", "p.user_id", "u.user_id")
    .where( "u.user_id", user_id )
  }

  function getPlantByPlantId(plant_id) {  
    return db("plants as p")
    .select("p.plant_nickname","p.plant_species" ,"p.h2ofrequency" )
    .where( "p.plant_id", plant_id ).first()
  }

  function getBySpeciesname(filter) {
    return db("users").where(filter)
  }


  //insert methods
  async function addPlant(plant) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
    const [newPlantObject] = await db('plants').insert(plant, ['user_id','plant_id', 'plant_nickname', 'plant_species','h2ofrequency'])
    return newPlantObject // { 'plant_id', 'plant_nickname', 'plant_species','h2ofrequency' }
  }
  //edit methods
  async function updatePlant (plant_id, contents) {
    const [updatedPlant] = await db('plants')
      .where('plant_id', plant_id)
      .update(contents, [
        'user_id',
        'plant_nickname',
        'plant_species',
        'h2ofrequency',
        'plant_image',
    
      ]);
    return updatedPlant;
  }


  //delete methods
  async function deletePlant(plant_id) {
    const plantToBeDeleted = await db("plants").where('plant_id',plant_id)
	await db('plants').where("plant_id", plant_id).del();
	return plantToBeDeleted;
  }
  
  module.exports = {
    getAllPlantsByUser,
    getPlantsByUserId,
    getPlantByPlantId,
    getBySpeciesname,
    addPlant,
    updatePlant,
    deletePlant
    
  };