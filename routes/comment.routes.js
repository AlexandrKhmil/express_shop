const { Router } = require('express')
const router = Router()
const pool = require('../connection')
const config = require('config')

// api/product/
router.get(
	'/comments',
	async (req, res) => {
		try {
			const productId = req.headers.productId
			const commentQuery = await pool.query(`
				SELECT 
					comment.message, 
					comment.create_time, 
					user.email,
					comment.productId
				FROM comment 
					INNER JOIN user ON comment.userId = user.id
				WHERE comment.productId = ${productId};
			`) 
			const comments = commentQuery[0]
			return res.status(200).json([ ...comments ])
		} catch (e) {
			return res.status(500).json({ message: 'Ошибка получения комментариев' })
		}
	}
)

module.exports = router