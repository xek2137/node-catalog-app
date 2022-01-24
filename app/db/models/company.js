const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { validateRestrictedValues } = require('../validators')

const companySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Field is required! Cannot be an empty string!'],
		minLength: [2, 'Minimum number of characters is 2!'],
	},
	slug: {
		type: String,
		required: [true, 'Field is required! Cannot be an empty string!'],
		minLength: [2, 'Minimum number of characters is 2!'],
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
