const express = require('express')
const authenticateJWT = require('../auth/authMiddleware')
const router = express.Router()
const db = require('../../database')

router.get('/profile', authenticateJWT,async (req, res) => {
  // Khi đến được đây, req.user đã được xác thực
  const user = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id])
  console.log('user', user)
  res.json({ ...user.rows[0] })
})

router.post('/users/')

module.exports = router
