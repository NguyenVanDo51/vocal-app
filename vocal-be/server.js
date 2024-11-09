require('dotenv/config')
const express = require('express')
var cors = require('cors')

const collectionRoutes = require('./modules/collection/collectionRoutes')
const userRoutes = require('./modules/user/userRoutes')
const groupRoutes = require('./modules/groups/groupRoutes')
const wordRoutes = require('./modules/words/wordRoutes')
const authRoutes = require('./modules/auth/authRoutes')
const authenticateJWT = require('./modules/auth/authMiddleware')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/protected', authenticateJWT, (req, res) => {
  res.json(req.user)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(401).send('Unauthenticated!')
})

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', userRoutes)
app.use('/api', groupRoutes)
app.use('/api', wordRoutes)

app.get('/', (req, res) => {
  res.json({ greeting: 'Hello world1' })
})

app.get('/api/test', (req, res) => {
  res.json({ msg: 'ok' })
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
