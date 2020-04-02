const { Router } = require('express')
const router = Router()
const pool = require('../connection')
const config = require('config')

// api/product/catalog
router.get(
	'/catalog',
	async (req, res) => {
		try {
			const productQuery = await pool.query(`SELECT * FROM product;`)
			const products = productQuery[0]
			return res.status(200).json({ ...products })
		} catch (e) {
			return res.status(500).json({ message: 'Ошибка получения каталога!' })
		}
	}
)

// api/product/vote
router.post(
	'/vote',
	async (req, res) => {
		try {
			const { email, value, productId } = req.body 

			const userQuery = await pool.query(`SELECT * FROM user WHERE email = \'${email}\';`) 

			if (userQuery[0].length === 0) {
				return res.status(400).json({ message: 'Такого пользователя не существует' }) 
			} 

			pool.query(`
				INSERT INTO vote (userId, productId, value) 
				VALUES (${userQuery[0][0].id}, ${productId}, ${value});
			`) 
			
			return res.status(200).json({ message: 'Оценка отправлена!' })
		} catch (e) {
			return res.status(500).json({ message: 'Ошибка оценки!' })
		}
	}
)

module.exports = router