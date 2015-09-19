
var User = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(nev) {
    nev.configure({
        verificationURL: 'http://127.0.0.1:8080/email-verification/${URL}',
        persistentUserModel: User,
        tempUserCollection: 'tempusers',

        transportOptions: {
            service: 'Gmail',
            auth: {
                user: configAuth.gmail.email,
                pass: configAuth.gmail.password
            }
        },
        verifyMailOptions: {
            from: "Do Not Reply <video45_do_not_reply@gmail.com>",
            subject: 'Please confirm account',
            html: "Click the following link to confirm your account:</p><p>${URL}</p>",
            text: 'Please confirm your account by clicking the following link: ${URL}'
        }
    });

    nev.generateTempUserModel(User);
};