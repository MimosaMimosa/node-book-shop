exports.uploadImage = (req, res, next) => {
    const name = req.files.image.name.split('.')[1];
    const time = new Date().getTime();
    const uploadPath = './upload/images/' + time + '.' + name;
    const image = req.files.image;
    image.mv(uploadPath, function (error) {
        next(error);
    });
    req.image = {
        name: req.files.image.name,
        path: uploadPath,
    };
    next();
};
