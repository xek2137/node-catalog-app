module.exports = {
	validateRestrictedValues(value) {
		const values = ['slug']

		values.forEach(e => {
			if (e === value) {
				throw new Error(`${value} is restricted one!`)
			}
		})
	},
}
