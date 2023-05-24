import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }).promise();

// REQUEST DATA ------------------------------------------

export async function getUserID(username) {
  const [user] =  await pool.query(`
  SELECT * 
  FROM userBase 
  WHERE username = ?
  `, [username])
  return user
}

export async function getUserPosts(user_ID) {
  const [rows] =  await pool.query(`
  SELECT * 
  FROM posts 
  WHERE author_ID = ?
  `, [user_ID])
  return rows
}

export async function getProfile(user_ID) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM userBase
    WHERE id = ?
    `, [user_ID])
    return rows
}

export async function getUserFriends(user_ID) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM friends
  WHERE profile_ID = ?
  `, [user_ID])
  return rows
}

export async function getPost(post_ID) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM posts
  WHERE post_ID = ?
  `, [post_ID])
  return rows
}

export async function getAllPosts() { 
  const [rows] = await pool.query(`
  SELECT * 
  FROM posts
  `)
  return rows
}

export async function getComments(post_ID) { 
  const [rows] = await pool.query(`
  SELECT * 
  FROM comments
  WHERE post_ID = ?
  `, [post_ID])
  return rows
}

export async function getLikes(post_ID) { 
  const [rows] = await pool.query(`
  SELECT * 
  FROM comments
  WHERE post_ID = ?
  `, [post_ID])
  return rows
}

export async function getUserLikes(user_ID) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM likes
  WHERE author_ID = ?
  `, [user_ID])
  return rows
}

export async function getUserComments(user_ID) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM comments
  WHERE author_ID = ?
  `, [user_ID])
  return rows
}


// ADD USERS / POSTS / COMMENTS / LIKES -----------------------------------------

export async function addUser(email, username, hash_password, first_name, last_name) {
  const [rows] = await pool.query(`INSERT INTO userBase (email, username, hash_password, first_name, last_name) VALUES ?`, [[email, username, hash_password, first_name, last_name]])
  return rows
}

export async function createPost(user_ID, image, description) { 
  const [rows] = await pool.query(`INSERT INTO posts (author_ID, image, description, tot_likes) VALUES ?`, [[user_ID, image, description, 0]])
  return rows
}

export async function editPost(post_ID, new_description) { 
  const [rows] = await pool.query(String.format(`UPDATE customers SET description = %s WHERE post_ID = %s`,new_description, post_ID))
  return rows
}

export async function createComment(post_ID, user_ID, content) {
  const [rows] = await pool.query(`INSERT INTO comments (author_ID, content, post_ID) VALUES ?`, [[user_ID, content, post_ID]])
  return rows
}

export async function changeLikeStatus(post_ID, user_ID) { 
/// Need to figure out how to check if an entry exists, to create a new one if it does not, and to remove it if it does. 
}

export async function addFriend(user_ID, friend_ID) {
  const [rows] = await pool.query(`INSERT INTO friends (friend_ID, profile_ID) VALUES ?`, [[friend_ID, user_ID]])
  return rows
}

// DELETING ENTRIES -----------------------------------

export async function deleteUser(user_ID) {
  return await pool.query(`DELETE FROM userbase WHERE user_ID = ?`, [user_ID]).affectedRows
}

export async function deletePost(post_ID) { 
  return await pool.query(`DELETE FROM posts WHERE post_ID = ?`, [post_ID]).affectedRows
}

export async function deleteComment(comments_ID) {
  return await pool.query(`DELETE FROM comments WHERE comments_ID = ?`, [comments_ID]).affectedRows
}

export async function delFriend(user_ID, friend_ID) {
  return await pool.query(`DELETE FROM friends WHERE (profile_ID = ? AND friend_ID = ?)`, [user_ID, friend_ID]).affectedRows
}