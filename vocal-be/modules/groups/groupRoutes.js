// routes/groupRoutes.js
const express = require('express')
const router = express.Router()
const db = require('../../database')
const authenticateJWT = require('../auth/authMiddleware')

// Lấy tất cả các group của user
router.get('/groups', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id
    const result = await db.query(`
      SELECT g.*, count(w.id) as word_count
      from groups g left join words w 
      on g.id = w.group_id where g.created_by = $1
      group by g.id
      `, [userId])
    res.json(result.rows)
  } catch (err) {
    console.log("err", err)
    res.status(500).json({ error: err })
  }
})

// Thêm group mới
router.post('/groups', authenticateJWT, async (req, res) => {
  const userId = req.user.id
  const { name, parent_id, category_id } = req.body
  try {
    const query =
      'INSERT INTO groups (created_by, name, parent_id, category_id) VALUES ($1, $2, $3, $4) RETURNING id'
    const result = await db.query(query, [userId, name, parent_id, category_id])
    res.json({ id: result.rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// Cập nhật group
router.put('/groups/:groupId', authenticateJWT, async (req, res) => {
  const { groupId } = req.params
  const userId = req.user.id
  const { name, parent_id, category_id } = req.body
  try {
    const query = 'UPDATE groups SET name = $2, parent_id = $3, category_id = $4 WHERE id = $1 AND user_id = $5'
    await db.query(query, [groupId, name, parent_id, category_id, userId])
    res.json({ message: 'group updated successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// Xóa group
router.delete('/groups/:groupId', authenticateJWT, async (req, res) => {
  const { groupId } = req.params
  const userId = req.user.id
  try {
    const query = 'DELETE FROM groups WHERE id = $1 AND user_id = $2'
    await db.query(query, [groupId, userId])
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
