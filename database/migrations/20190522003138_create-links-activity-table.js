
exports.up = function(knex, Promise) {
    return knex.schema.createTable('links_activity', links_activity => {
        links_activity.increments();
        links_activity.boolean('read').defaultTo(false);
        links_activity.boolean('is_pinned').defaultTo(false);
        links_activity.integer('rating').unsigned().defaultTo(0);
        links_activity.integer('link_id').unsigned().references('id').inTable('links');
        links_activity.integer('user_id').unsigned().references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links_activity');
};
