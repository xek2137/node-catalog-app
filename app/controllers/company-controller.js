const Company = require('../db/models/company')
class CompanyController {
	async showCompanies(req, res) {
		const companies = await Company.find({})

		res.render('pages/companies/companies', {
			companies,
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
			filmCount: req.body.filmCount,
		})
		try {
			await company.save()
			res.redirect('/companies')
		} catch (e) {
			res.render('pages/companies/add', {
				errors: e.errors,
			})
		}
	}
}

module.exports = new CompanyController()
