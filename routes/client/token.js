const { Router } = require("express");
const { mail } = require("../../mail/mailer");
const PasswordReset = require("../../model/PasswordReset");
const User = require("../../model/User");
const router = Router();
const dayjs = require("../../utils/dayjs");
const { createError } = require("../../utils/error");

router.get("/verify-email/:token", async (req, res, next) => {
	try {
		const verify = await PasswordReset.findOne({
			token: req.query.email,
			expired_at: {
				$gt: dayjs().toISOString(),
			},
		}).sort({ _id: -1 });

		if (!verify.token === req.params.token) {
			return createError(422, { message: "Invalid Token" }, next);
		}
		
		await User.findOne({ email: token.email }).updateOne({
			email_verify_at: dayjs().toISOString(),
		});
		res.status(200).json({ message: "Verified email successfully." });
	} catch (error) {
		next(error);
	}
});

router.post("/email-verification", async (req, res, next) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email });
		mail({
			from: '"Fred Foo 👻" <foo@example.com>',
			to: user.email,
			subject: "Hello ✔",
			text: "Hello world?",
		});
		return res.status(200).json({
			message: "Please check your email for verification link.",
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
