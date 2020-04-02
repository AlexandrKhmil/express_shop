const { Router } = require('express')
const router = Router()
const { check, validationResult } = require('express-validator')
const config = require('config')
const pool = require('../connection')

// api/order/add
router.post(
	'/vote',
	async (req, res) => {
		try {
			const { email, products } = req.body 

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

// INSERT INTO `express_shop`.`order_products` (`id_order`, `id_product`, `quantity`) VALUES 
// ('1', '1', '1'), 
  // ('1', '2', '2');
