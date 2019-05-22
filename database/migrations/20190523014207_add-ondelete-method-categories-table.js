
exports.up = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        // categories.dropColumn('created_by');
        categories.integer('created_by_').notNullable().defaultTo(0).references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('categories', categories => {
        categories.dropColumn('created_by_').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        // categories.integer('created_by').notNullable().defaultTo(0).references('id').inTable('users');
    });
};
