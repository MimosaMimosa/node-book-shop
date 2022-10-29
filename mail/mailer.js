const nodemailer = require("nodemailer");
const randomToken = require("random-token");
const PasswordReset = require("../model/PasswordReset");
const dayjs = require("../utils/dayjs");

exports.mail = async (config) => {
	const token = randomToken(50);
	
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

	await PasswordReset.findOneAndUpdate(
		{
			email: config.to,
		},
		{
			expired_at: dayjs().toISOString(),
		},
		{
			sort: {
				createdAt: -1,
			},
		}
	);

	const passwordReset = new PasswordReset({
		email: config.to,
		token,
	});

	await passwordReset.save();

	let info = await transporter.sendMail(config);

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
