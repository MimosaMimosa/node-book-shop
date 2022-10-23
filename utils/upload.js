exports.uploadImage = (path) => {
    return (req, res, next) => {
        const name = req.files.image.name.split('.')[1];
        const time = new Date().getTime();
        const filename = time + '.' + name;
        const uploadPath = `./${path}${filename}`;
        const image = req.files.image;
        image.mv(uploadPath, function (error) {
            next(error);
        });
        req.image = {
            name: req.files.image.name,
            path: `${path}${filename}`,
        };
        next();
    };
};

exports.uploadPdf = (req, res, next) => {
    const name = req.files.pdf.name.split('.')[1];
    const time = new Date().getTime();
    const uploadPath =
        process.env.APP_URL + '/upload/books/' + time + '.' + name;
    const image = req.files.pdf;
    image.mv(uploadPath, function (error) {
        next(error);
    });
    req.image = {
        name: req.files.pdf.name,
        path: uploadPath,
    };
    next();
};
