
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', categories => {
        categories.increments();
        categories.string('title', 255).notNullable();
        categories.string('#FF0000').notNullable();
        categories.integer('created_by').notNullable().references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('categories');
};
