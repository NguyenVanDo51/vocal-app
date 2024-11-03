const express = require('express')
const router = express.Router()
const db = require('../../database')
const authenticateJWT = require('../auth/authMiddleware')

router.get('/profile', authenticateJWT, async (req, res) => {
  // Khi đến được đây, req.user đã được xác thực
  const user = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id])
  res.json({ ...user.rows[0] })
})

router.post('/users/')

module.exports = router
