const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { validateRestrictedValues } = require('../validators')

const companySchema = new Schema({
	name: {
		type: String,
		required: [true, 'TV-Portal field is required! Cannot be an empty string!'],
		minLength: [2, 'TV-Portal name: minimum number of characters is 2!'],
		unique: [true, 'Name Already Exists'],
	},
	slug: {
		type: String,
		required: [true, 'Your slug field is required! Cannot be an empty string!'],
		minLength: [2, 'Your slug: minimum number of characters is 2!'],
		unique: [true, 'Slug Already Exists'],
		validate: validateRestrictedValues,
	},
	filmsCount: {
		type: Number,
		min: 10,
		default: 10,
	},
})

// setter
// companySchema.path('slug').set((value) => value.toLowerCase())

const Company = mongoose.model('Company', companySchema)

module.exports = Company
