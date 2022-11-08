exports.ErrorBag = async (req, next, schema) => {
	try {
		await schema.validateAsync(req.validateBody, {
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

exports.unique = async ({ modal, unique, ignore, rule }) => {
	try {
		const request = global.request();
		let query = {
			[unique]: request.validateBody[unique],
		};
		if (ignore) {
			const [key, val] = ignore;
			query = {
				...query,
				[key]: {
					$ne: val,
				},
			};
		}
		request.validateBody[unique] = [request.validateBody[unique]];
		const data = await modal.findOne(query).exec();
		if (data) {
			request.validateBody[unique] = [data.email, data.email];
		}
		return rule;
	} catch (error) {
		return rule;
	}
};

exports.file = ({ type, key, rule }) => {
	const request = global.request();
	if (type === "image") {
		request.validateBody[key] = request.files?.image?.mimetype ?? "";
		return rule;
	}
};
