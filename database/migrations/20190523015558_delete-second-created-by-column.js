
exports.up = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        categories.dropColumn('created_by_');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        categories.integer('created_by_');
    })
};
