const express = require('express')
const router = express.Router()
const db = require('../../database')
const authenticateJWT = require('../auth/authMiddleware')
const isAdminMiddleware = require('../auth/isAdminMiddleware')

router.get('/categories', authenticateJWT, async (req, res) => {
  try {
    const result = await db.query(`SELECT * from categories`)
    res.json(result.rows)
  } catch (err) {
    console.log("err", err)
    res.status(500).json({ error: err })
  }
})

router.post('/categories', isAdminMiddleware, async (req, res) => {
  const { name, image } = req.body
  try {
    const query =
      'INSERT INTO categories (name, image) VALUES ($1, $2) RETURNING id'
    const result = await db.query(query, [name, image])
    res.json({ id: result.rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.put('/categories/:categoryId', isAdminMiddleware, async (req, res) => {
  const { name, image } = req.body
  try {
    const query = 'UPDATE categories SET name = $2, image = $3 WHERE id = $1'
    await db.query(query, [categoryId, name, image])
    res.json({ message: 'category updated successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.delete('/categories/:categoryId', isAdminMiddleware, async (req, res) => {
  const { categoryId } = req.params
  try {
    const query = 'DELETE FROM categories WHERE id = $1'
    await db.query(query, [categoryId])
    res.json({ message: 'group deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
