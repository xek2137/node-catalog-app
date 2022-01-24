const mongoose = require('mongoose')
const { database } = require('../config')

mongoose
	.connect(database)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error("Coudn't connect MongoDB....", err))
