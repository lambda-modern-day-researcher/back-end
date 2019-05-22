
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {title: 'finance', color: '#FF0000', created_by: 1},
        {title: 'programming', color: '#FF0000', created_by: 2},
        {title: 'physics', color: '#FF0000', created_by: 3},
      ]);
    });
};
