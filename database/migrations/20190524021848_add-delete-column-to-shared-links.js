
exports.up = function(knex, Promise) {
    return knex.schema.table('shared_links', shared_links => {
        shared_links.boolean('remove_link').defaultTo(false);
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.table('shared_links', shared_links => {
        shared_links.dropColumn('remove_link');
    });    
};
