const { Router } = require("express");
const PasswordReset = require("../../model/PasswordReset");
const User = require("../../model/User");
const router = Router();
const dayjs = require("../../utils/dayjs");

router.get("/verify-email/:token", async (req, res, next) => {
	try {
		const token = await PasswordReset.findOne({
			token: req.params.token,
			expired_at: {
				$gte: dayjs().toISOString(),
			},
		});
		await User.findOne({ email: token.email }).updateOne({
			email_verify_at: dayjs().toISOString(),
		});
		return res
			.status(200)
			.json({ success: true, message: "Verified email successfully." });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
