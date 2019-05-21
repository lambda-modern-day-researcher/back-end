
exports.up = function(knex, Promise) {
    return knex.schema.createTable('shared_links', shared_links => {
        shared_links.increments();
        shared_links.integer('link_id').unsigned().notNullable().references('id').inTable('links');
        shared_links.integer('shared_by').unsigned().notNullable().references('id').inTable('users');
        shared_links.integer('shared_with').unsigned().notNullable().references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('shared_links');
};
