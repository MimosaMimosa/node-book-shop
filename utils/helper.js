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
exports.usePagination = (total, currentPage) => {
    let pagination = [];
    if (total >= 8) {
        if (current < 5) {
            pagination = [
                ...[...Array(5).keys()].map((x) => x + 1),
                '...',
                total,
            ];
        } else if (current >= 5 && current + 3 < total) {
            pagination = [
                1,
                '...',
                ...Array(3)
                    .fill(current - 1)
                    .map((x, y) => x + y),
                '...',
                total,
            ];
        } else if (current + 3 >= total && current !== 5) {
            pagination = [
                1,
                '...',
                ...Array(5)
                    .fill(total - 4)
                    .map((x, y) => x + y),
            ];
        }
    } else {
        pagination = [
            ...Array(total)
                .fill(1)
                .map((x, y) => x + y),
        ];
    }

    return pagination;
};
