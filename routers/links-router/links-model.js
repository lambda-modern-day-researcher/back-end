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
  console.log(filter, userId)
  return db.raw(
    `SELECT 
      shared_links.shared_by, shared_links.shared_with,
      links.title, links.url, links.id as link_id ,
      links_activity.is_pinned, links_activity.read,
      links_categories.id as links_categories_id,
      categories.title as category_title, categories.color as category_color, categories.id as category_id
    from shared_links 
    inner join links on shared_links.link_id = links.id
    inner join links_activity on links.id = links_activity.link_id
    left join links_categories on links.id = links_categories.link_id
    left join categories on links_categories.category_id = categories.id
    WHERE shared_links.shared_by = ${userId} 
    AND shared_Links.shared_with = ${userId} 
    AND links_activity.is_pinned = ${filter}`
  );
}


// function findByPinned(userId, filter) {
//   console.log(filter, userId)
//   return db.raw(
//     `SELECT 
//       links_activity.read, links_activity.is_pinned, links_activity.rating, 
//       users.email, 
//       links.id, links.title, links.url, links.created_by, links.created_at, 
//       shared_links.shared_by, shared_links.shared_with,
//       categories.title as category_title, categories.color 
//     from shared_links 
//     cross join links on shared_links.link_id = links.id
//     cross join users on shared_links.shared_with = users.id
//     cross join links_activity on links.id = links_activity.link_id
//     cross join links_categories on links.id = links_categories.link_id
//     cross join categories on categories.created_by = users.id
//     where links_activity.is_pinned = ${filter} AND shared_links.shared_with = ${1}`
//   );
// }

function findAllCategory(id) {
  return db.raw(
    `SELECT *
    from categories
    where created_by = ${id} AND [delete] = 0;`
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

function update(id) {
  return db.raw(`UPDATE categories SET [delete] = true WHERE id = ${id};`)
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
  let sql = `INSERT INTO 
    links_activity (read, is_pinned, rating, link_id, user_id) 
    VALUES (false, false, ${0}, '${link_id}', '${user_id}')`
    console.log(sql)
    return db.raw(sql)
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
