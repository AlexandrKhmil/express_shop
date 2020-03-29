const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// MYSQL
const mysql = require('mysql')
const config = require('./config/default.json')
const connection = mysql.createConnection(config)

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('/q', async (req, res) => {
	connection.query('SELECT* FROM new_table', (err, rows, fields) => {
		res.send(rows)
	})
})

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const start = async () => {
	try { 
		app.listen(port, () => console.log(`App's port: ${port}!`))  
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start()
