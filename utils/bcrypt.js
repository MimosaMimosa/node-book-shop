const bcrypt = require('bcryptjs');
exports.hash = (data) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data, salt);
    return hash;
};

exports.compare = (data, hash) => {
    return bcrypt.compareSync(data, hash);
};
