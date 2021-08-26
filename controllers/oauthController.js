const {user} = require('../models/index.js')
const {OAuth2Client} = require('google-auth-library')
const axios = require('axios')

class oauthController{
    static loginGoogle(req, res, next){
        console.log("token ", req.body)
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const {token} = req.body;
        let emailUser = "";

        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            const {email} = payload
            emailUser = email;

            console.log("ticket", req.body)

            return user.findOne({
                where: {email: emailUser}
            })
        }).then(result => {
            if (!result) {
                console.log("create user")
                return user.create({
                    email: emailUser,
                    password: String(Math.random()) + String(Math.random())
                })
            } else {
                console.log("DONE user")
                return {
                    id: result.id,
                    email: result.email
                }
            }
        })
        .then(result => {
            console.log("user ==>", result)
            const token = generateToken({
                id: result.id,
                email: result.email
            })

            res.status(201).json({access_token: token})
        })
    }

    static loginCaptcha(req, res, next){
        console.log(req.body)

        let data = {
            secret: process.env.SECRET_KEY_CAPTCHA,
            response: req.body.response
        }

        console.log(data)

        axios({
            method: 'post',
            url: `https://www.google.com/recaptcha/api/siteverify?secret=${data.secret}&response=${data.response}`
        })
        .then(result => {
            console.log("HASIL CATPCHA", result.data)
            res.status(201).json(result.data)
        })          
        .catch(err => {
            next(err)
        })
    }
}

module.exports = oauthController