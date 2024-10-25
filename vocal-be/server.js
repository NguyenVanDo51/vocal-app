const express = require('express')
var cors = require('cors')
const authRoutes = require('./modules/auth/authRoutes')
const collectionRoutes = require('./modules/collection/collectionRoutes')
const userRoutes = require('./modules/user/userRoutes')

const app = express()

const corsOptions = {
  origin: 'https://api.talk4learn.com', // Thay đổi thành miền cụ thể nếu cần
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Nếu bạn cần gửi cookies hoặc thông tin xác thực
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/', () => {
  return 'Hello World'
})

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', cors(), userRoutes)

const PORT = 3001

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
