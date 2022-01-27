const { count } = require('console')
const Company = require('../db/models/company')
class CompanyController {
	async showCompanies(req, res) {
		const { search, sort, min, max } = req.query
		const page = req.query.page || 1
		const perPage = 2

		const location = {}

		if (search) {
			location.name = { $regex: search, $options: 'i' }
		}

		if (min || max) {
			location.filmsCount = {}
			if (min) location.filmsCount.$gte = min
			if (max) location.filmsCount.$lte = max
		}

		let query = Company.find()

		query = query.skip((page - 1) * perPage)
		query = query.limit(perPage)

		if (sort) {
			const s = sort.split('|')
			query = query.sort({ [s[0]]: s[1] })
		}

		const companies = await query.exec()
		const resultsCount = await Company.find(location).count()
		const pagesCount = Math.ceil(resultsCount / perPage)
		
		res.render('pages/companies/companies', {
			companies,
			page,
			pagesCount,
			resultsCount,
		})
	}
	async showCompany(req, res) {
		const { name } = req.params

		const company = await Company.findOne({ slug: name })

		res.render('pages/companies/company', {
			name: company?.name,
			title: company?.name ?? 'Not found',
		})
	}

	showAddCompanyForm(req, res) {
		res.render('pages/companies/add')
	}

	async addCompany(req, res) {
		const company = new Company({
			name: req.body.name,
			slug: req.body.slug,
			filmsCount: req.body.filmsCount,
		})
		try {
			await company.save()
			res.redirect('/companies')
		} catch (e) {
			res.render('pages/companies/add', {
				errors: e.errors,
				form: req.body,
			})
		}
	}

	async showEditCompanyForm(req, res) {
		const { name } = req.params
		const company = await Company.findOne({ slug: name })
		res.render('pages/companies/edit', {
			form: company,
		})
	}

	async editCompany(req, res) {
		const { name } = req.params
		const company = await Company.findOne({ slug: name })
		company.name = req.body.name
		company.slug = req.body.slug
		company.filmsCount = req.body.filmsCount

		try {
			await company.save()
			res.redirect('/companies')
		} catch (e) {
			res.render('pages/companies/edit', {
				errors: e.errors,
				form: req.body,
			})
		}
	}

	async deleteCompany(req, res) {
		const { name } = req.params

		try {
			await Company.deleteOne({ slug: name })
			res.redirect('/companies')
		} catch (error) {
			//
		}
	}
}

module.exports = new CompanyController()
