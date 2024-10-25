const express = require('express')
var cors = require('cors')
const authRoutes = require('./modules/auth/authRoutes')
const collectionRoutes = require('./modules/collection/collectionRoutes')
const userRoutes = require('./modules/user/userRoutes')

const app = express()

app.use(express.json())

const corsOptions = {
  origin: ['http://localhost:3000', 'https://vocal-app.vercel.app'], // Các miền được phép
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers được phép
};

// Sử dụng middleware CORS
app.use(cors(corsOptions));

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', userRoutes)

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
