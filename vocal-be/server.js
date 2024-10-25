const express = require('express')
var cors = require('cors')
const authRoutes = require('./modules/auth/authRoutes')
const collectionRoutes = require('./modules/collection/collectionRoutes')
const userRoutes = require('./modules/user/userRoutes')

const app = express()

app.use(express.json())
app.use(
  cors(
    {
      origin: 'https://vocal-app.vercel.app', // Thay bằng tên miền của bạn
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Phương thức HTTP được phép
      allowedHeaders: ['Content-Type', 'Authorization'], // Headers được phép
    },
    {
      origin: 'http://localhost:3000', // Thay bằng tên miền của bạn
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Phương thức HTTP được phép
      allowedHeaders: ['Content-Type', 'Authorization'], // Headers được phép
    }
  )
)

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', userRoutes)

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
