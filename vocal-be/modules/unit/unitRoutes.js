// routes/collectionRoutes.js
const express = require('express')
const router = express.Router()
const db = require('../../database')
const authenticateJWT = require('../auth/authMiddleware')

router.get('/users/:userId/unit', async (req, res) => {
  try {
    const { userId } = req.params
    const query = 'SELECT * FROM unit WHERE user_id = $1'
    const result = await db.query(query, [userId])
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// CRUD unit
router.post('/unit', authenticateJWT, async (req, res) => {
  const userId = req.user.id
  const { name, description } = req.body
  try {
    const query = 'INSERT INTO unit (user_id, name, description) VALUES ($1, $2, $3) RETURNING id'
    const result = await db.query(query, [userId, name, description])
    res.json({ id: result.rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.put('/unit/:unitId', async (req, res) => {
  const { unitId } = req.params
  const { name } = req.body
  try {
    const query = 'UPDATE unit SET name = $2 WHERE id = $1'
    await db.query(query, [unitId, name])
    res.json({ message: 'unit updated successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.delete('/unit/:unitId', async (req, res) => {
  const { unitId } = req.params
  try {
    const query = 'DELETE FROM unit WHERE id = $1'
    await db.query(query, [unitId])
    res.json({ message: 'unit deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.get('/unit/:unitId/collections', authenticateJWT, async (req, res) => {
  const { unitId } = req.params
  try {
    let result
    if (unitId == '-1') {
      result = await db.query('SELECT * FROM collections WHERE unit_id IS NULL and user_id = $1', [
        req.user.id,
      ])
    } else {
      result = await db.query('SELECT * FROM collections WHERE unit_id = $1 and user_id = $2', [
        unitId,
        req.user.id,
      ])
    }
    console.log(result.rows)
    res.json(
      result.rows.map((collection) => ({ ...collection, words: JSON.parse(collection.words) }))
    )
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
