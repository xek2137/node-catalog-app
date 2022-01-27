module.exports = function (req, res, next) {
	res.locals.form = {}
	res.locals.query = req.query
	next()
}
