// controllers/collectionController.js
const db = require('../../database')

// Lấy tất cả bộ từ vựng của một user
exports.getCollections = async (req, res) => {
  const { userId } = req.params
  try {
    const result = await db.query('SELECT * FROM collections WHERE user_id = $1', [userId])
    res.json(
      result.rows.map((collection) => ({ ...collection, words: JSON.parse(collection.words) }))
    )
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.getCollectionInfo = async (req, res) => {
  const { collectionId } = req.params
  try {
    const result = await db.query('SELECT * FROM collections WHERE id = $1', [collectionId])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Collection not found' })
    }
    res.json({ ...result.rows[0], words: JSON.parse(result.rows[0].words) })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

// Tạo bộ từ vựng mới
exports.createCollection = async (req, res) => {
  const user = req.user
  const userId = user.id

  const { name, words, topic_id = null } = req.body
  console.log([userId, name, words, topic_id])
  try {
    await db.query(
      'INSERT INTO collections (user_id, name, words, topic_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [userId, name, JSON.stringify(words), topic_id]
    )

    res.status(201).json({ message: 'Collection created successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

// Sửa một bộ từ vựng, xóa tất cả từ cũ và tạo lại
exports.updateCollection = async (req, res) => {
  const { collectionId } = req.params
  const { name, words, topic_id = null } = req.body

  try {
    await db.query(
      'UPDATE collections SET name = $2, topic_id = $3, words = $4 WHERE id = $1',
      [collectionId, name, topic_id, JSON.stringify(words)]
    )

    res.json({ message: 'Collection updated successfully' })
  } catch (err) {
    res.status(500).json({ error: err})
  }
}

// Xóa một bộ từ vựng
exports.deleteCollection = async (req, res) => {
  const { collectionId } = req.params
  try {
    await db.query('DELETE FROM collections WHERE id = $1', [collectionId])

    res.json({ message: 'Collection deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Database error' })
  }
}
