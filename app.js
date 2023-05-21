import express from 'express'
//import ~~~ from './database.js'

const app = express()

app.use(express.json())

app.use(async (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke! Please try again later :)) ')
  })

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})