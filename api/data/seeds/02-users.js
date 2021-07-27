
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
        username: 'lambda',
        password: '$2a$08$eUq5Nf68T.3lWymXhy5G5OYT9tubevRMWmUp0qrGDVtdhlI4rzNSC', //lambda123
        user_email: 'contact@lambdaschool.com', 
        user_phone: '415-262 4219'
      }   ,
      {
        username: 'guest',
        password: '$2a$08$s6L.gDR1dp92cdXHeJX7N.Hq.GRE6TvJir7Npw86Dg.xst3G9bYMe', //123
        user_email: 'test@lambdaschool.com', 
        user_phone: '408-333-666'
      }         
      ]);
    });
};
