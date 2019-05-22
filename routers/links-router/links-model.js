const db = require('../../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByCategory,
};

function find() {
    return db('links');
}

function findBy(id, filter) {
    return db.raw(
        `SELECT 
            links_activity.read, links_activity.is_pinned, links_activity.rating, 
            users.email, 
            links.id, links.title, links.url, links.created_by, links.created_at, 
            shared_links.shared_by, shared_links.shared_with,
            categories.title as category_title, categories.color 
        from shared_links 
        inner join links on shared_links.link_id = links.id
        inner join users on shared_links.shared_with = users.id
        inner join links_activity on links.id = links_activity.link_id
        inner join links_categories on links.id = links_categories.link_id
        inner join categories on categories.created_by = users.id
        where links_activity.is_pinned = ${filter} AND users.id = ${id}`
    );
}

function findByCategory(id) {
  return db.raw(
    `SELECT 
      categories.id, categories.title, categories.color, categories.created_by, users.username
    from categories
    inner join users on users.id = categories.created_by
    where categories.created_by = ${id}`
  )
}
async function add(user) {
  const [id] = await db('shared_links').insert(user);

  return findById(id);
}

function findById(id) {
  return db('shared_links')
    .where({ id })
    .first();
}
