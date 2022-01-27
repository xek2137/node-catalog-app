const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { validateIsEmail } = require('../validators')

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		unique: [true, 'Name Already Exists'],
        validate: [validateIsEmail, 'Wrong email address']
	},
	password: {
		type: String,
		required: true,
        minlength: [6, 'Password must be at least 6 characters long']
	},
})

// setter
// companySchema.path('slug').set((value) => value.toLowerCase())

const User = mongoose.model('User', userSchema)

module.exports = User
