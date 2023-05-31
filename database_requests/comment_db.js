let pool = require('./mysql_connector')


async function getComments(post_ID) { 
    const [rows] = await pool.query(`
    SELECT * 
    FROM comments
    WHERE post_ID = ?
    `, [post_ID])
    return rows
  }

async function getUserComments(user_ID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM comments
    WHERE author_ID = ?
    `, [user_ID])
    return rows
  }

 async function createComment(post_ID, user_ID, content) {
    const [rows] = await pool.query(`INSERT INTO comments (author_ID, content, post_ID) VALUES ?`, [[user_ID, content, post_ID]])
    return rows
  }

async function deleteComment(comments_ID) {
    return await pool.query(`DELETE FROM comments WHERE comments_ID = ?`, [comments_ID]).affectedRows
  }

module.exports = { getComments, getUserComments, createComment, deleteComment };