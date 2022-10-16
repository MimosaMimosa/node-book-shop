const User = require('../../model/User');
const { compare } = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (compare(password, user.password)) {
                const { password, ...hidePassword } = user._doc;
                const token = jwt.sign(
                    {
                        data: hidePassword,
                    },
                    process.env.SECRET_CODE,
                    { expiresIn: '2h' }
                );
                return res.status(200).json({ token });
            }

            return res
                .status(422)
                .json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        next(error);
    }
};
