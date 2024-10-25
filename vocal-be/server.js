const express = require('express')
var cors = require('cors')
const authRoutes = require('./modules/auth/authRoutes')
const collectionRoutes = require('./modules/collection/collectionRoutes')
const userRoutes = require('./modules/user/userRoutes')
const authenticateJWT = require('./modules/auth/authMiddleware')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ greeting: 'Hello world' })
})

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', userRoutes)

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
