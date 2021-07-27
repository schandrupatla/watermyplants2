
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {user_id: 1, plant_nickname: 'Golden_Bamboo', plant_species:"Phyllostachys_aurea", h2ofrequency:1,plant_image:""},
        {user_id: 1, plant_nickname: 'Snake_plant', plant_species:"Sansevieria_trifasciata", h2ofrequency:3,plant_image:""},
        {user_id: 2, plant_nickname: 'Daffodil', plant_species:"Narcissus",h2ofrequency:2, plant_image:""},
        {user_id: 2, plant_nickname: 'Easter_lily', plant_species:"Narc_Lilium_longiflorumissus",h2ofrequency:4, plant_image:""},
       
      ]);
    });
};
