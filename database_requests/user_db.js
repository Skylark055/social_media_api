let pool = require('./mysql_connector')

export async function getUserID(username) { //// NEEDS FIXINGGG
    const [user] =  await pool.query(`
    SELECT * 
    FROM userbase 
    WHERE username = ?
    `, [username])
    return user
  }

async function getProfile(user_ID) {
    const [rows] = await pool.query(`
      SELECT * 
      FROM userBase
      WHERE user_ID = ?
      `, [user_ID])
      return rows
  }

async function addUser(email, username, hash_password, first_name, last_name) {
    const [rows] = await pool.query(`INSERT INTO userBase (email, username, password, first_name, last_name) VALUES (?)`, [[email, username, hash_password, first_name, last_name]])
    return rows
  }
  

async function deleteUser(user_ID) {
    return await pool.query(`DELETE FROM userbase WHERE user_ID = ?`, [user_ID]).affectedRows
  }
module.exports = { getUserID, getProfile, addUser, deleteUser};