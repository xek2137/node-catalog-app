const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))

app.set('layout', path.join('layouts/main'))
app.use(expressEjsLayouts)

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('pages/home', {
		title: 'Home page',
	})
})

app.get('/companies/:name', (req, res) => {
	const { name } = req.params
	const companies = [
		{ name: 'Netflix', slug: 'netflix' },
		{ name: 'HBO GO', slug: 'hbogo' },
	]

	const company = companies.find(company => company.slug === name)

	res.render('pages/company', {
		name: company?.name,
		companies,
		title: company?.name ?? 'Not found',
	})
})

app.get('*', (req, res) => {
	res.render('errors/404', {
		title: '404 - not found!',
		layout: 'layouts/second',
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
