
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {user_id: 1, plant_nickname: 'Golden_Bamboo',plant_species:"Phyllostachys aurea",h2ofrequency:1,plant_image:""},
        {user_id: 1, plant_nickname: 'Snake plant',plant_species:"Sansevieria trifasciata",h2ofrequency:3,plant_image:""},
       
      ]);
    });
};
