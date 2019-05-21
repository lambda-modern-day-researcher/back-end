
exports.up = function(knex, Promise) {
    return knex.schema.createTable('links_categories', links_categories => {
        links_categories.increments();
        links_categories.integer('link_id').notNullable().references('id').inTable('links');
        links_categories.integer('category_id').notNullable().references('id').inTable('categories');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links_categories');
};
