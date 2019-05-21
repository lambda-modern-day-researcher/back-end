
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('links').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('links').insert([
        {title: 'link-one', url: 'https://knexjs.org/#Schema-timestamp', created_by: 1},
        {title: 'link-two', url: 'https://www.dbdesigner.net/designer/schema/new', created_by: 2},
        {title: 'link-three', url: 'http://perkframework.com/v1/guides/database-migrations-knex.html', created_by: 3}
      ]);
    });
};
