const nodemailer = require("nodemailer");

exports.mail = async (config) => {
	let transporter = nodemailer.createTransport({
		service: env("MAIL_SERVICE"),
		host: "smtp.ethereal.email",
		port: env("MAIL_PORT"),
		secure: false,
		auth: {
			user: env("SEND_MAIL"),
			pass: env("SEND_MAIL_PASSWORD"),
		},
	});

	let info = await transporter.sendMail(config);

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
