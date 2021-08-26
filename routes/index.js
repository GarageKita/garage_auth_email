const express = require('express') 
const router = express.Router() 
const emailController = require('../controllers/emailController.js')
const oauthController = require('../controllers/oauthController.js')
const ongkirController = require('../controllers/ongkirController.js')
const handlerGetSlash = (req, res) => {
    res.send("Ini adalah API Untuk Auth dan Email")
}

router.get('/', handlerGetSlash) 

router.post('/email/sendactivation/:email', emailController.sendActivation)
router.get('/email/activation', emailController.activatedAccount)
router.get('/oauthgoogle/login-google', oauthController.loginGoogle)

// /ongkir
router.get('/ongkir/province', ongkirController.getProvince)
router.get('/ongkir/city', ongkirController.getCity)
router.post('/ongkir/cost', ongkirController.countCost)
module.exports = router