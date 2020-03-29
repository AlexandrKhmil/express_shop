const { Router } = require('express')
const router = Router()

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