const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config')

router.post('/auth/google', (req, res) => {
  const { userId } = req.body

  const jwtToken = jwt.sign({ id: userId }, jwtSecret, { expiresIn: '31557600000' })
  return res.send(jwtToken)
})

module.exports = router
