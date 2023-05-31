let pool = require('./mysql_connector')

async function getLikes(post_ID) { 
    const [rows] = await pool.query(`
    SELECT * 
    FROM comments
    WHERE post_ID = ?
    `, [post_ID])
    return rows
  }

  
async function changeLikeStatus(post_ID, user_ID) { 
    /// Need to figure out how to check if an entry exists, to create a new one if it does not, and to remove it if it does. 
    }

async function getUserLikes(user_ID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM likes
    WHERE author_ID = ?
    `, [user_ID])
    return rows
  }

module.exports = { getLikes, changeLikeStatus, getUserLikes };