
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('links_activity').del()
    .then(function () {
      // Inserts seed entries
      return knex('links_activity').insert([
        {read: false, is_pinned: false, rating: 2, link_id: 1, user_id: 1},
        {read: false, is_pinned: false, rating: 2, link_id: 2, user_id: 2},
        {read: false, is_pinned: false, rating: 2, link_id: 3, user_id: 3},
      ]);
    });
};
