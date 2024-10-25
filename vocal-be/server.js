const express = require('express')
var cors = require('cors')
const authRoutes = require('./modules/auth/authRoutes')
const collectionRoutes = require('./modules/collection/collectionRoutes')
const userRoutes = require('./modules/user/userRoutes')

const app = express()

app.use(express.json())

const corsOptions = (req, callback) => {
  let corsOptions;
  if (req.header('Origin') === 'https://vocal-app.vercel.app' || req.header('Origin') === 'http://localhost:3000') {
      corsOptions = { origin: true }; // Cho phép yêu cầu từ miền hợp lệ
  } else {
      corsOptions = { origin: false }; // Không cho phép yêu cầu từ miền không hợp lệ
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptions));

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', userRoutes)

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
