
exports.up = function(knex, Promise) {
    return knex.schema.table('links_categories', categories => {
        categories.dropColumn('categories_id');
    });  
};

exports.down = function(knex, Promise) {
  
};
