
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {user_id: 1, plant_nickname: 'Golden_Bamboo', plant_species:"Phyllostachys_aurea", h2ofrequency:1,plant_image:"https://www.thespruce.com/thmb/TI3xrtpTN1Aq_naYMsJ9_o3rY0g=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/003_Bamboo_TheSpruce_PhoebeCheongPhoto-14aa6e3d4049400081696ba5bf4090f8.jpg"},
        {user_id: 1, plant_nickname: 'Snake_plant', plant_species:"Sansevieria_trifasciata", h2ofrequency:3,plant_image:"https://www.thespruce.com/thmb/4orpD642Evm7qFvdZueJtzW1ZtY=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/snake-plant-care-overview-1902772-10-e1f66a9000764c1391906bbf192ed704.jpg"},
        {user_id: 2, plant_nickname: 'Daffodil', plant_species:"Narcissus",h2ofrequency:2, plant_image:"https://www.thespruce.com/thmb/3_MY9DRSMXEbytAvAPoJW-PUFAY=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/planting-and-growing-daffodils-1402136_01-bb8eada2ffb4443dbb20a7b1f0f3dfce.jpg"},
        {user_id: 2, plant_nickname: 'Easter_lily', plant_species:"Narc_Lilium_longiflorumissus",h2ofrequency:4, plant_image:"https://www.thespruce.com/thmb/4VTSwK4yslsDyiHotmtnZJvqeKk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/caring-for-easter-lilies-1403159-2-64ccf52cb94e4bc1b1e9ae0dad1af18f.jpg"},
       
      ]);
    });
};
