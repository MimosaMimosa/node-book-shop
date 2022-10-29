const nodemailer = require("nodemailer");
let randomToken = require("random-token");
const PasswordReset = require("../model/PasswordReset");

exports.mail = async (config) => {
	const token = randomToken(50);
	config.html = `<a href="${randomToken(20)}">Token</a>`;

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

	const passwordReset = new PasswordReset({
		email: config.to,
		token,
	});

	await passwordReset.save();

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
