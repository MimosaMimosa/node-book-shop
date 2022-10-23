exports.showError = async (...arg) => {
    const [req, res, next, schema] = arg;
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        let details = error.details;
        let format = {};
        details.forEach(function (error) {
            format[error.context.label] = error.message.replaceAll('"','');
        });
        console.log(format)
      return  res.status(422).json(format);
    }
};