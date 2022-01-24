const express = require('express')
const router = new express.Router()
const CompanyController = require('../controllers/company-controller')
const HomeController = require('../controllers/home-controller')
const ErrorsController = require('../controllers/errors-controller')

router.get('/', HomeController.home)
router.get('/companies', CompanyController.showCompanies)
router.get('/companies/add', CompanyController.showAddCompanyForm)
router.post('/companies/add', CompanyController.addCompany)
router.get('/admin/companies/:name', CompanyController.showCompany)
router.get('*', ErrorsController.notFound)

module.exports = router
