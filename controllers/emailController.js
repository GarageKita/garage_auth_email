const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

class EmailController{
    static sendActivation(req, res, next) {
        res.send('Masuk"')

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
        to: 'budigk@gmail.com',
        subject: 'Aktivasi',
        text: 'TEST AKTIVASI'
        };   

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
       });
    }
}

module.exports = EmailController