let pool = require('./mysql_connector')

async function getUserFriends(user_ID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM friends
    WHERE profile_ID = ?
    `, [user_ID])
    return rows
  }

async function addFriend(user_ID, friend_ID) {
    const [rows] = await pool.query(`INSERT INTO friends (friend_ID, profile_ID) VALUES ?`, [[friend_ID, user_ID]])
    return rows
  }

async function delFriend(user_ID, friend_ID) {
    return await pool.query(`DELETE FROM friends WHERE (profile_ID = ? AND friend_ID = ?)`, [user_ID, friend_ID]).affectedRows
  }

module.exports = { getUserFriends, addFriend, delFriend };