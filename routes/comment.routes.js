const { Router } = require('express')
const router = Router()
const pool = require('../connection')
const config = require('config')
const { check, validationResult } = require('express-validator')

// api/comment/comments
router.get(
	'/comments',
	async (req, res) => {
		try {
			const productId = req.headers.productid
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
			return res.status(200).json({ ...comments })
		} catch (e) {
			return res.status(500).json({ message: 'Ошибка получения комментариев' })
		}
	}
)

// /api/comment/add
router.post(
	'/add',
	[
		check('email', 'Некоректный email').normalizeEmail().isEmail(),
		check('message', 'Сообщение слишком короткое').exists().isLength({ min: 5, max: 10000}),
		check('productId', 'Неверный продукт').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при отправке отзыва'
				})
			} 

			const { email, message, productId } = req.body 

			const userQuery = await pool.query(`SELECT * FROM user WHERE email = \'${email}\';`) 

			if (userQuery[0].length === 0) {
				return res.status(400).json({ message: 'Такого пользователя не существует' }) 
			}
			
			console.log(userQuery[0][0].id)

			pool.query(`
					INSERT INTO comment (userId, message, productId) 
					VALUES (${userQuery[0][0].id}, '${message}', ${productId});
				` 
			)
			
			return res.status(200).json({ message: 'OK' })
		} catch(e) {
			return res.status(500).json({ message: 'Ошибка отправки комментария' })
		}
	}
)

module.exports = router