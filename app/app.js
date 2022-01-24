const express = require('express')
const app = express()
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')

require('./db/mongoose')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/../views'))

app.set('layout', path.join('layouts/main'))
app.use(expressEjsLayouts)

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true  }))

app.use(require('./routes/web.js'))

module.exports = app
