const User = require('../db/models/user')

class UserController {
	showRegister(req, res) {
		res.render('pages/auth/register')
	}

	async register(req, res) {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
		})
		try {
			await user.save()
			res.redirect('/login')
		} catch (e) {
			res.render('pages/auth/register', {
				errors: e.errors,
				form: req.body,
			})
		}
	}
}

userSchema.path('password').set(value => )

module.exports = new UserController()
