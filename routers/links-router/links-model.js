const db = require('../../database/dbConfig.js');

module.exports = {
  find,
  findByPinned,
  findById,
  findByCategory,
  addCategory,
  findCategoryCreator,
  findAllCategory,
  update,
  addLinks,
  addSharedLinks,
  getTheLastItem,
  shareLink,
  autoCreateLinkActivity,
  changeLinkActivity,
  updateTitle,
  changeLinkActivityCompleted,
};

function find() {
    return db('links');
}

function findByPinned(userId, filter) {
  return db.raw(
    `SELECT 
      links_activity.read, links_activity.is_pinned, links_activity.rating, 
      users.email, 
      links.id, links.title, links.url, links.created_by, links.created_at, 
      shared_links.shared_by, shared_links.shared_with,
      categories.title as category_title, categories.color 
    from shared_links 
    cross join links on shared_links.link_id = links.id
    cross join users on shared_links.shared_with = users.id
    inner join links_activity on links.id = links_activity.link_id
    inner join links_categories on links.id = links_categories.link_id
    inner join categories on categories.created_by = users.id
    where links_activity.is_pinned = ${filter} AND users.id = ${userId}`
  );
}

function findAllCategory(id) {
  return db.raw(
    `SELECT 
      categories.id, categories.title, categories.color, categories.created_by, users.username
    from categories
    inner join users on users.id = categories.created_by
    where categories.created_by = ${id}`
  )
}

async function addCategory(category) {
  // const [id] = await db('categories').insert(category)
  return db.raw(`INSERT INTO categories (title, created_by, color) VALUES ('${category.title}', '${category.created_by}', '${category.color}')`)

  // return findById(id, 'categories');
}

function findByCategory(userId, categoryId) {
  return db.raw(
    `SELECT 
        links_activity.read, links_activity.is_pinned, links_activity.rating, 
        users.email, 
        links.id, links.title, links.url, links.created_by, links.created_at, 
        shared_links.shared_by, shared_links.shared_with,
        categories.title as category_title, categories.color, categories.id as category_id
    from shared_links 
    cross join links on shared_links.link_id = links.id
    cross join users on shared_links.shared_with = users.id
    cross join links_activity on links.id = links_activity.link_id
    cross join links_categories on links.id = links_categories.link_id
    cross join categories on categories.created_by = users.id
    where categories.id = ${categoryId} AND users.id = ${userId}`
  );
}

function findCategoryCreator(id) {
  let category = db.raw(`SELECT * from categories where id = ${id}`)

  return category
}

function update(id, changes) {
  return db('categories')
      .where({ id })
      .update(changes)
      .then(count => {
          if (count > 0) {
              return findById(id);
          } else {
              return null;
          }
      });
}

function addLinks(title, url, created_by) {
  console.log(title, url, created_by)
  return db.raw(`INSERT INTO links (title, url, created_by) VALUES ('${title}', '${url}', '${created_by}')`)
}

function addSharedLinks(link_id, shared_by, shared_with) {
  return db.raw(`INSERT INTO shared_links (link_id, shared_by, shared_with) VALUES ('${link_id}', '${shared_by}', '${shared_with}')`)  
}

function getTheLastItem(table) {
  return db.raw(`SELECT * from ${table} ORDER BY id DESC LIMIT 1`)
}

function shareLink(link_id, shared_by, shared_with) {
  return db.raw(`INSERT INTO shared_links (link_id, shared_by, shared_with) VALUES ('${link_id}', '${shared_by}', '${shared_with}')`)
}

function autoCreateLinkActivity(link_id, user_id) {
  return db.raw(`INSERT INTO 
    links_activity (read, is_pinned, rating, link_id, user_id) 
    VALUES ('${false}', '${false}', '${0}', '${link_id}', '${user_id}')`)
}

function changeLinkActivity(activity) {
  return db.raw(`UPDATE links_activity
  SET is_pinned = NOT is_pinned
  WHERE link_id = ${activity.link_id} AND user_id = ${activity.user_id};`) 
}

function changeLinkActivityCompleted(activity) {
  return db.raw(`UPDATE links_activity
  SET read = NOT read
  WHERE link_id = ${activity.link_id} AND user_id = ${activity.user_id};`) 
}

function updateTitle(title, id) {
  return db.raw(`UPDATE links 
    SET title = '${title}' 
    WHERE id = ${id}`)
}

function findById(id, table) {
  return db(table)
    .where({ id })
    .first();
}
