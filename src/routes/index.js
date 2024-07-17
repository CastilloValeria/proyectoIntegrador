const express = require('express');
const router = express.Router();
const {home,search,contact,sucursales,about,term,pregu,garantia} = require("../controllers/indexcontrollers")

router
.get('/', home)
.get('/search', search)
.get('/contact', contact)
.get('/sucursales',sucursales)
.get('/about', about)
.get("/term",term)
.get("/pregu",pregu)
.get("/garantia",garantia)


module.exports = router;
