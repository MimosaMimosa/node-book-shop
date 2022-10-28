exports.ErrorBag = async (req, next, schema) => {
	try {
		const data = { ...req.body };

		if (req.files) {
			data.image = req.files?.image?.mimetype ?? "undefined";
		}
		await schema.validateAsync(data, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		let details = error.details;
		let format = {};
		details.forEach(function (error) {
			format[error.context.label] =
				error.message.replaceAll('"', "") + ".";
		});
		error.status = 422;
		error.data = format;
		next(error);
	}
};

exports.unique = async (modal, key, value, message) => {
	const user = await modal.findOne({ [key]: value });
	return user;
};
