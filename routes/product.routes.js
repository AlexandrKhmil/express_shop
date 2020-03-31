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
      return res.status(200).json([ ...products ])
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка получения каталога' })
    }
  }
)

module.exports = router