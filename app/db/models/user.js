const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { validateIsEmail } = require('../validators')

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		unique: true,
		validate: [validateIsEmail, 'Wrong email address'],
	},
	password: {
		type: String,
		required: true,
		minlength: [6, 'Password must be at least 6 characters long'],
	},
})

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next()
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(this.password, salt)
	this.password = hash
	next()
})

userSchema.post('save', function (error, doc, next) {
	if (error.code === 11000) {
		error.errors = { email: { message: 'This email already exists!' } }
	}
	next(error)
})
// const hashPassword = async (password, saltRounds = 10) => {
// 	try {
// 		// Generate a salt
// 		const salt = await bcrypt.genSalt(saltRounds)

// 		// Hash password
// 		return await bcrypt.hash(password, salt)
// 	} catch (error) {
// 		console.log(error)
// 	}

// 	// Return null if error
// 	return null
// }
// userSchema.path('password').set(hashPassword)
// setter
// companySchema.path('slug').set((value) => value.toLowerCase())

const User = mongoose.model('User', userSchema)

module.exports = User
