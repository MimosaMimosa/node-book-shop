const User = require('../../model/User');
const { compare } = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');
const { createError } = require('../../utils/error');
const { config } = require('../../utils/helper');
exports.login = async (req, res, next) => {
    const maxAge = 3 * 24 * 60 * 60;
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user.email_verify_at) {
            return createError(
                401,
                { message: 'Please check your email for verification link.' },
                next
            );
        }
        if (user && compare(password, user.password)) {
            const { password, email_verify_at, ...others } = user._doc;
            const token = jwt.sign(
                {
                    data: others,
                },
                env('SECRET_CODE'),
                { expiresIn: config('cookie.cookies_expired_in', maxAge) }
            );
            others.token = token;

            return res.status(200).json({ user: others });
        }
        return createError(
            422,
            { message: 'Invalid username or password.' },
            next
        );
    } catch (error) {
        next(error);
    }
};
