const nodemailer = require("nodemailer");

exports.mail = async (config) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.ethereal.email",
		port: 587,
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
