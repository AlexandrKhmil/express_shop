const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = Router()


const pool = require('../connection')

// /api/auth/user
router.get(
	'/user',
	async (req, res) => {
		const decode = jwt.decode(req.headers.authorization, config.get('jwtSecret'))
		return res.status(200).json({userId: decode['userId']})
	}
)

// /api/auth/login
router.post(
	'/login',
	async (req, res) => {
		try {
			const { email, password } = req.body 
			
			// GET USER
			const userQuery = await pool.query(`SELECT * FROM user WHERE email = \'${email}\';`)
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

// /api/auth/logout
router.post(
	'/logout',
	async (req, res) => {
		try {
			return res.status(200).json({"message": 'ok'})
		} catch(e) {
			return res.status(500).json({"message": 'Что-то не так'})
		} 
	}
)

// /api/auth/register
router.post(
	'/register',
	async (req, res) => {
		try {
			const { email, password } = req.body
			const query = await pool.query(`INSERT INTO user (\`email\`, \`password\`) VALUES (\'${email}\', \'${password}\');`)
			const insertId = query[0].insertId

			const token = jwt.sign(
				{ userId: insertId },
				config.get('jwtSecret'),
				{ expiresIn: '1h' }
			)

			return res.status(200).json({token, userId: insertId})
		} catch(e) {
			return res.status(500).json({"message": 'Что-то не так'})
		}
	}
)

module.exports = router