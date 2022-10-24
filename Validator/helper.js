exports.ErrorBag = async (...arg) => {
    const [req, res, next, schema] = arg;
    const data = { ...req.body };
    
    if (req.files) {
        data.image = req.files?.image?.mimetype ?? 'undefined';
    }
    try {
        await schema.validateAsync(data, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        let details = error.details;
        let format = {};
        details.forEach(function (error) {
            format[error.context.label] =
                error.message.replaceAll('"', '') + '.';
        });
        return res.status(422).json(format);
    }
};

exports.unique = async (modal, key, value, message) => {
    const user = await modal.findOne({ [key]: value });
    return user;
};
