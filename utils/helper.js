exports.calculatePaginate = async function (amount = 10) {
    const req = request();
    const currentPage = parseInt(req.query.page ?? 1);
    const limit = parseInt(req.query.limit ?? amount);
    const skip = limit * (currentPage - 1);
    return [currentPage, skip, limit];
};
exports.config = (search, df = null) => {
    try {
        const [file, key] = search;
        const config = require(`../config/${file}`);
        return config[key] ?? df;
    } catch (error) {
        console.error(error);
    }
};
