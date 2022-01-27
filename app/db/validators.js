module.exports = {
	validateRestrictedValues(value) {
		const values = ['slug']

		values.forEach(e => {
			if (e === value) {
				throw new Error(`${value} is restricted one!`)
			}
		})
	},

	validateIsEmail(value) {
		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

		return reg.test(value)
	},
}
