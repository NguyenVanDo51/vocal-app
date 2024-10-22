// routes/collectionRoutes.js
const express = require('express')
const router = express.Router()
const collectionController = require('./collectionController')
const authenticateJWT = require('../auth/authMiddleware')

// Lấy tất cả bộ từ vựng của người dùng
router.get('/users/:userId/collections', collectionController.getCollections)

router.get('/collections/:collectionId', collectionController.getCollectionInfo)

// Tạo bộ từ mới
router.post('/collections', authenticateJWT, collectionController.createCollection)

// Sửa bộ từ
router.put('/collections/:collectionId', authenticateJWT, collectionController.updateCollection)

// Xóa bộ từ
router.delete('/collections/:collectionId', authenticateJWT, collectionController.deleteCollection)

module.exports = router
