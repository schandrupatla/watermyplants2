const db = require('../data/db-config');


function find() {  
    return db("users")
  }

function findById(id) {  
    let results =  db("users").where( "id", id ).first();
    return results;
  }

  function findBy(filter) {
    return db("users").where(filter)
  }
// async function add(user) {
//     const [id] = await db("users").insert(user);
//     return findById(id);
//   }

  async function add(user) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
  }
  function findByPhone(phone){
    let results =  db("users").where( "user_phone", phone ).first();
    return results;
  }
  
  module.exports = {
    find,
    add,
    findById,
    findBy,
    findByPhone
  };