require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const usersRouter = require('./Routes/Users')
const petsRouter = require('./Routes/Pets')
const path = require('path')
const app = express()
const port = 5000

const cors = require('cors')
app.use(cors())
mongoose.connect(
  'mongodb://localhost:27017/PetAdopDb',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Successfully connected to database.')
  }
)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ title: 'Express & Mongoose Template' })
})

app.use('/pets', petsRouter);
app.use('/users', usersRouter)
app.use('/static', express.static(path.join(__dirname, 'Uploads')))

app.listen(port, () => console.log(`Express dev server started on port ${port}`))