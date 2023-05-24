import express from 'express'
import { addUser, createPost, getAllPosts, getComments, getLikes, getPost, getProfile, getUserComments, getUserLikes, getUserPosts } from './database.js'
import CryptoJS from 'crypto-js'
import { createPool } from 'mysql2'

const app = express()

app.use(express.json())

// ALL GET REQUESTS FOR THE API -----------------------------

app.get('/profile/getid/:username', async (req, res) => {
  const username = req.params.username
  const profile_ID = await getUserID(username)
  res.send (profile_ID)
  //return user ID from username
})

app.get('/profile/:id', async (req, res) => { 
  const id = req.params.id
  const profile = await getProfile(id)
  res.send (profile)
  // return user profile
})

app.get('/profile/:id/posts', async (req, res) => {
  const id = req.params.id 
  const userPosts = await getUserPosts(id)
  res.send (userPosts)
  // return user posts
})

app.get('profile/:id/likes', async (req, res) => {
  const id = req.params.id
  const userLikes = await getUserLikes(id)
  res.send (userLikes)
  // return user likes
})

app.get('profile/:id/comments', async (req, res) => { 
  const id = req.params.id
  const userComments = await getUserComments(id)
  res.send (userComments)
  // return user comments
})

app.get('/posts', async (req, res) => { 
  const posts = await getAllPosts()
  res.send (posts)
  // return all posts
})


app.get('/posts/:id', async (req, res) => { 
  const id = req.params.id
  const post = await getPost(id)
  res.send (post)
  // return post
})

app.get('/posts/:id/comments', async (req, res) => { 
  const id = req.params.id
  const comments = getComments(id)
  res.send (comments)
  // return comments to the post 
})

app.get('/posts/:id/likes', async (req, res) => { 
  const id = req.params.id
  const likes = await getLikes(id)
  res.send (likes)
  // return all likes for post
})

// ALL THE POST REQUESTS FOR THE API -----------------------------

app.post('/register', async (req, res) => { 
  var {email, username, password, first_name, last_name} = req.body
  password = CryptoJS.SHA512(password)
  user = await addUser(email, username, password, first_name, last_name)
  res.status(201).send(user.user_ID)
})

app.post('/posts', async (req, res) => { 
  const {user_ID, image, description} = req.body
  const post = await createPost(user_ID, image, description)
  res.status(201).send (post)
})

app.post('/posts/:id/edit', async)

// Error handling and server start -----------------------------

app.use(async (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke! Please try again later :)) ')
  })

app.listen(8080, () => {
    console.log('Server is running on port 8080')
}) 
