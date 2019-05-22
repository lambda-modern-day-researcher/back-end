
exports.up = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        categories.boolean('delete').defaultTo(false);
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        categories.dropColumn('delete');
    });    
};
