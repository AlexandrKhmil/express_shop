const mysql = require('mysql2/promise')
const config = require('config')
const connection = mysql.createPool(config.get('db')) 

module.exports = connection