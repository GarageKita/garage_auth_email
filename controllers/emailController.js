'use strict'

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const url = 'https://garage-kita-3rd.herokuapp.com'
const { v1: uuidv1} = require('uuid');
const {User} = require('../models/index.js');

class EmailController{
    static async sendActivation(req, res, next) {
        console.log('params', req.params.email)
        let emailKirim = req.params.email
        let uniqueCode = uuidv1();
        let userId;
        let emailText = `
        
        Thanks for signing up with Garage Kita! You must follow this link to activate your account:
                
        ${url}/email/activation/?code=${uniqueCode}
                
        Have fun, and don't hesitate to contact us with your feedback.
                
        The Garage Team`

        console.log('email', emailKirim)

        User.findOne({
            where: {email: emailKirim}
        }).then(result => {
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `Data with email ${email} Not Found`
                })
            } else {
                userId = result.id

                let transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'garagekitah8',
                        pass: 'MasteR99'
                    }
               }));
        
               const mailOptions = {
                from: 'garagekitah8@gmail.com',
                to: emailKirim,
                subject: 'Confirm Your Account on Garage Kita',
                text: emailText
                };   
        
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        throw ({
                            name: "EmailSendError",
                            message: error
                        })
                    } else {
                        // console.log('Email send: ' + info.response)
                        if (result.uniqueCode === null) {
                            return User.update({uniqueCode: uniqueCode}, {
                                where: {
                                    email: emailKirim
                                }
                            })
                        } else {
                            uniqueCode = result.uniqueCode
                        }
                    }
               });

            }
        }).then(result => {
            res.status(201).json({success: true, message: {id: userId, uniqueCode: uniqueCode, message: 'Email sent'}})
        }).catch(err => next(err))

    }

    static activatedAccount (req, res, next) {
        let activationCode = req.query.code;

        console.log(activationCode, process.env.NODE_ENV)

        User.update({isActivated: true}, {
            where: {
                uniqueCode: activationCode
            },
            returning: true
        })
        .then(result => {
            console.log('xxxxxxxxx')
            if (result[0] === 0){
                throw ({
                    name: "NotFound",
                    message: `Data Not Found`
                })
            } else {
                console.log('zzzzzz')
                res.status(200).json({success: true, message: result[1][0]})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = EmailController