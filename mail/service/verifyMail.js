const randomToken = require('random-token');
const fs = require('fs');
const PasswordReset = require('../../model/PasswordReset');
const { dirname } = require('path');
const { mail } = require('../mailer');
const appDir = dirname(require.main.filename);

const verifyEmail = async (to) => {
    try {
        const token = randomToken(50);
        const config = {
            from: '"Fred Foo 👻" <bookshoptesting@gmail.com>',
            to,
            subject: 'Email Verification',
            html: fs
                .readFileSync(`${appDir}/mail/html/verifyEmail.html`)
                .toString()
                .replace(
                    'link-to-v',
                    `http://localhost:4000/api/v1/token/verify-email/${token}?email=${to}`
                ),
        };
        await mail(config);
        const passwordReset = new PasswordReset({
            email: config.to,
            token,
        });
        await passwordReset.save();
    } catch (error) {
        console.log(error);
    }
};

module.exports = verifyEmail;
