const bcrypt = require('bcryptjs');
exports.hash = (data) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
};

exports.compare = (data, hash) => {
    return bcrypt.compareSync(data, hash);
};
