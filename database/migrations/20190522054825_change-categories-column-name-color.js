
exports.up = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        categories.string('color').notNullable().defaultTo('#FF0000');
        categories.dropColumn('#FF0000');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        categories.dropColumn('color');
        categories.string('color').notNullable().defaultTo('#FF0000');
    });
};
