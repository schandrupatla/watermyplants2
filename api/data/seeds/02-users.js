
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'lambda',password: 'lambda123', user_email: 'contact@lambdaschool.com', user_phone: '415-262 4219'}
               
      ]);
    });
};
