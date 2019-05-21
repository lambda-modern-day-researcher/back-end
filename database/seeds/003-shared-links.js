
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shared_links').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('shared_links').insert([
        {link_id: 1, shared_by: 1, shared_with: 2},
        {link_id: 2, shared_by: 2, shared_with: 3},
        {link_id: 3, shared_by: 3, shared_with: 1},
      ]);
    });
};
