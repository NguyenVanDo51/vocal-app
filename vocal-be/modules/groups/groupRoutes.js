// routes/groupRoutes.js
const express = require('express')
const router = express.Router()
const db = require('../../database')
const authenticateJWT = require('../auth/authMiddleware')

// Lấy tất cả các group của user
router.get('/groups', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id
    const result = await db.query('SELECT * FROM groups WHERE created_by = $1', [userId])
    res.json(result.rows)
  } catch (err) {
    console.log("err", err)
    res.status(500).json({ error: err })
  }
})

// Thêm group mới
router.post('/groups', authenticateJWT, async (req, res) => {
  const userId = req.user.id
  const { name, parent_id } = req.body
  try {
    const query =
      'INSERT INTO groups (created_by, name, parent_id) VALUES ($1, $2, $3) RETURNING id'
    const result = await db.query(query, [userId, name, parent_id])
    res.json({ id: result.rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// Cập nhật group
router.put('/groups/:groupId', authenticateJWT, async (req, res) => {
  const { groupId } = req.params
  const { name, parent_id } = req.body
  try {
    const query = 'UPDATE groups SET name = $2, parent_id = $3 WHERE id = $1'
    await db.query(query, [groupId, name, parent_id])
    res.json({ message: 'group updated successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// Xóa group
router.delete('/groups/:groupId', authenticateJWT, async (req, res) => {
  const { groupId } = req.params
  try {
    const query = 'DELETE FROM groups WHERE id = $1'
    await db.query(query, [groupId])
    res.json({ message: 'group deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// Lấy các nhóm con của một group
router.get('/groups/:groupId/children', authenticateJWT, async (req, res) => {
  const { groupId } = req.params
  try {
    let result
    if (groupId == '-1') {
      result = await db.query('SELECT * FROM groups WHERE parent_id IS NULL and created_by = $1', [
        req.user.id,
      ])
    } else {
      result = await db.query('SELECT * FROM groups WHERE parent_id = $1 and created_by = $2', [
        groupId,
        req.user.id,
      ])
    }
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
