class HomeController {
	home(req, res) {
		res.render('pages/home', {
			title: 'Home page',
		})
	}
}

module.exports = new HomeController()
