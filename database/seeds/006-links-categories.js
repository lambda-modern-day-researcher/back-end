
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('links_categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('links_categories').insert([
        {link_id: 1, category_id_: 1},
        {link_id: 2, category_id_: 2},
        {link_id: 3, category_id_: 3},
      ]);
    });
};
