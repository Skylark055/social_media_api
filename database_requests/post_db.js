let pool = require('./mysql_connector')
  
async function getPost(post_ID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM posts
    WHERE post_ID = ?
    `, [post_ID])
    return rows
  }

async function getAllPosts() { 
    const [rows] = await pool.query(`
    SELECT * 
    FROM posts
    `)
    return rows
  }
  
async function getUserPosts(user_ID) {
    const [rows] =  await pool.query(`
    SELECT * 
    FROM posts 
    WHERE author_ID = ?
    `, [user_ID])
    return rows
  }

async function createPost(user_ID, image, description) { 
    const [rows] = await pool.query(`INSERT INTO posts (author_ID, image, description, tot_likes) VALUES ?`, [[user_ID, image, description, 0]])
    return rows
  }
  
async function editDescriptionPost(post_ID, new_description) { 
    const [rows] = await pool.query(String.format(`UPDATE posts SET description = %s WHERE post_ID = %s`,new_description, post_ID))
    return rows
  }

async function deletePost(post_ID) { 
    return await pool.query(`DELETE FROM posts WHERE post_ID = ?`, [post_ID]).affectedRows
  }

module.exports = { getPost, getAllPosts, getUserPosts, createPost, editDescriptionPost, deletePost };