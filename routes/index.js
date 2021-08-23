const express = require('express') 
const router = express.Router() 
const emailController = require('../controllers/emailController.js')

const handlerGetSlash = (req, res) => {
    res.send("Ini adalah API Untuk Auth dan Email")
}

router.get('/', handlerGetSlash) 

router.get('/email/sendactivation/:id', emailController.sendActivation)

module.exports = router