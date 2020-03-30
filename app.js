const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const mysqlAdmin = require('node-mysql-admin');
app.use(mysqlAdmin(app));

const connection = require('./connection')

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))


// FRONTEND
app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const start = async () => {
	try {  
		app.listen(port, () => console.log(`Port: ${port}`))  
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start()
