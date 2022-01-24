class ErrorsController {
	notFound(req, res) {
		res.render('errors/404', {
			title: '404 - not found!',
			layout: 'layouts/second',
		})
	}
}

module.exports = new ErrorsController()
