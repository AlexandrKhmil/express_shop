const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = Router()


const connection = require('../connection')

// /api/auth/user
router.get(
	'/user',
	async (req, res) => {
		console.log(req.headers.authtoken)
		return res.status(200).json({'message': '1'})
	}
)

// /api/auth/login
router.post(
	'/login',
	async (req, res) => {
		try {
			const { email, password } = req.body 
			
			// GET USER
			const userQuery = await connection.query(`SELECT * FROM user WHERE email = \'${email}\'`)
			if (userQuery[0].length === 0) {
				return res.status(500).json({"message": 'Пользователь не найден'}) 
			}
			const user = userQuery[0][0]

			// CHECK PASSWORD
			if (user.password !== password) {
				return res.status(500).json({"message": 'Неверный пароль'})
			}

			// GET TOKEN
			const token = jwt.sign(
				{ userId: user.id },
				config.get('jwtSecret'),
				{ expiresIn: '1h' }
			)
			
			return res.json({ 
				token, 
				"userId": user.id 
			})
		} catch(e) {
			return res.status(500).json({"message": 'Что-то не так'})
		}
	}
)

// /api/auth/register
router.post(
	'/register',
	(req, res) => {
		res.status(201).json({ message: 'Пользователь создан' })
	}
)

router.get(
	'/qqq',
	(req, res) => {
		try {
			res.status(201).json({ message: 'Пользователь создан' })
		} catch(e) {
			res.status(201).json({ message: 'Пользователь создан' })
		} 
	}
)

module.exports = router