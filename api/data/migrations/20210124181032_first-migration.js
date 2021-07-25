exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.string('user_email', 200).nullable().
      users.string('user_phone', 12).notNullable().unique()//000-000-000
      users.timestamps(false, true)
      //users.string('created_at',{ precision: 6 }).defaultTo(knex.fn.now())
    })
    // .createTable('plants', (plants) => {
    //   plants.increments('plant_id')
    //   plants.string('plant_nickname', 200).notNullable().unique()
    //   plants.string('plant_species', 200).notNullable()
    //   plants.string('h2ofrequency', 200).notNullable()
    //   plants.string('plant_image', 200).nullable()
    //   // plants.integer('user_id')
    //   // .unsigned()
    //   // .notNullable()
    //   // .references('user_id')
    //   // .inTable('users')
    //   // .onUpdate('RESTRICT')
    //   // .onDelete('RESTRICT')
    //   plants.timestamps(false, true);
    // })
}

exports.down = async (knex) => {
  //await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
}
