
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments();
  
        users.string('email', 255).notNullable().unique();
  
        users.string('password').notNullable();
  
        users.string('username', 255).notNullable().unique();
  
        users.boolean('is_private');
    })
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
  