
exports.up = function(knex, Promise) {
  return knex.schema.createTable('links', links => {
      links.increments();
      links.string('title', 255).notNullable();
      links.string('url').notNullable().unique();
      links.integer('created_by').unsigned().notNullable().references('id').inTable('users');
      links.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links');
};
