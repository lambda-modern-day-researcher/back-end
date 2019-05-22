exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
  .then(() => {
    return knex.raw('PRAGMA FOREIGN_KEYS = OFF')
  })
  .then(() => {
    return knex('users').truncate()
  })
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'user_one@gmail.com', password: '1234', username: 'user_one', is_private: false},
        {email: 'user_two@gmail.com', password: '1234', username: 'user_two', is_private: false},
        {email: 'user_three@gmail.com', password: '1234', username: 'user_three', is_private: false}
      ]);
    });
};
