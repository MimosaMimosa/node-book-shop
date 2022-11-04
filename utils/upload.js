exports.uploadImage = (path) => {
	return (req, res, next) => {
		if (!req.files) {
			return next();
		}
		try {
			path = path.replace(".", "/");
			const name = req.files.image.name.split(".")[1];
			const time = new Date().getTime();
			const filename = time + "." + name;
			const uploadPath = `./${path}/${filename}`;
			const image = req.files.image;
			req.mv = () => {
				image.mv(uploadPath);
			};
			req.image = {
				name: req.files.image.name,
				path: `/${path}/${filename}`,
			};
			next();
		} catch (error) {
			next(error);
		}
	};
};
