const express = require('express')
const router = express.Router()
const db = require('../../database')
const authenticateJWT = require('../auth/authMiddleware')

router.get('/words', authenticateJWT, async (req, res) => {
  const { group_id, limit = 20, offset = 0 } = req.query

  try {
    let query = 'SELECT * FROM words'
    let queryParams = []

    // Thêm điều kiện lọc theo group_id nếu có
    if (group_id) {
      query += ' WHERE group_id = $1'
      queryParams.push(group_id)
    }

    // Thêm phân trang với limit và offset
    query += ' ORDER BY id ASC LIMIT $2 OFFSET $3'
    queryParams.push(Number(limit), Number(offset))

    const result = await db.query(query, queryParams)

    // Trả về danh sách các từ và tổng số từ
    res.json({
      words: result.rows,
      hasMore: result.rows.length === Number(limit), // Nếu số lượng trả về bằng limit, có thể còn dữ liệu
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// API thêm một từ mới vào bảng `words`
router.post('/words', authenticateJWT, async (req, res) => {
  const { word, meaning, proun, group_id, image, example } = req.body
  try {
    const query = `
      INSERT INTO words (word, meaning, proun, group_id, image, example)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `
    // console.log((await db.query(query, [word, meaning, proun, group_id, image, example])).command)
    const result = await db.query(query, [word, meaning, proun, group_id, image, example])
    res.json({ id: result.rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// API cập nhật từ trong bảng `words`
router.put('/words/:id', authenticateJWT, async (req, res) => {
  const wordId = req.params.id
  const { word, meaning, proun, group_id, image, example } = req.body
  try {
    const query = `
      UPDATE words
      SET word = $1, meaning = $2, proun = $3, group_id = $4, image = $5, example = $6
      WHERE id = $7
      RETURNING id
    `
    const result = await db.query(query, [word, meaning, proun, group_id, image, example, wordId])
    res.json({ id: result.rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// API xóa một từ trong bảng `words`
router.delete('/words/:id', authenticateJWT, async (req, res) => {
  const wordId = req.params.id
  try {
    const query = 'DELETE FROM words WHERE id = $1 RETURNING id'
    const result = await db.query(query, [wordId])
    res.json({ id: result.rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// API xóa nhiều từ trong bảng `words`
router.post('/words', authenticateJWT, async (req, res) => {
  const { ids } = req.body
  try {
    const query = 'DELETE FROM words WHERE id = ANY($1::int[]) RETURNING id'
    const result = await db.query(query, [ids])
    res.json({ deletedIds: result.rows.map((row) => row.id) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router