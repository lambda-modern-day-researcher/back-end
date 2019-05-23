
exports.up = function(knex, Promise) {
    return knex.schema.table('links', links => {
        links.dropUnique('url');
    });  
};

exports.down = function(knex, Promise) {
    // return knex.schema.table('links', links => {
    //     links.dropUnique('url');
    // });  
};
