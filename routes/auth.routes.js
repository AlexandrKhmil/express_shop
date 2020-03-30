const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = Router()

const config = require('config')
const pool = require('../connection')

// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Минимальная длина пароля - 6 символов').isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при регистрации'
				})
			}

			const { email, password } = req.body
			
			const userQuery = await pool.query(`SELECT * FROM user WHERE email = \'${email}\';`)
			if (userQuery[0].length !== 0) {
				return res.status(400).json({message: 'Пользователь с таким email уже существует'}) 
			}

			const hashedPassword = await bcrypt.hash(password, 12)

			const query = await pool.query(
				`INSERT INTO user (\`email\`, \`password\`) VALUES (\'${email}\', \'${hashedPassword}\');`
			)

			const insertId = query[0].insertId

			const token = jwt.sign(
				{ userId: insertId },
				config.get('jwtSecret'),
				{ expiresIn: '1h' }
			)

			return res.status(200).json({token, userId: insertId})
		} catch(e) {
			return res.status(500).json({message: 'Что-то не так'})
		}
	}
)






// /api/auth/user
router.get(
	'/user',
	async (req, res) => {
		return res.status(400).json({ userId: 1 })
		// const decode = jwt.decode(req.headers.authorization, config.get('jwtSecret'))
		// return res.status(200).json({userId: decode['userId']})
	}
)

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Некоректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists().isLength({ min: 5 })
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(500).json({
					errors: errors.array(),
					message: 'Некорректные данные при входе в систему'
				})
			}

			return res.status(200).json({message: 'ok'})

			// const { email, password } = req.body 
			
			// // GET USER
			// const userQuery = await pool.query(`SELECT * FROM user WHERE email = \'${email}\';`)
			// if (userQuery[0].length === 0) {
			// 	return res.status(500).json({"message": 'Пользователь не найден'}) 
			// }
			// const user = userQuery[0][0]

			// // CHECK PASSWORD
			// if (user.password !== password) {
			// 	return res.status(500).json({"message": 'Неверный пароль'})
			// }

			// // GET TOKEN
			// const token = jwt.sign(
			// 	{ userId: user.id },
			// 	config.get('jwtSecret'),
			// 	{ expiresIn: '1h' }
			// )
			
			// return res.json({ 
			// 	token, 
			// 	"userId": user.id 
			// })
		} catch(e) {
			return res.status(500).json({message: 'Что-то не так'})
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

module.exports = router