const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const fileupload = require("express-fileupload");
const cors = require("cors");
const { registerClient, registerAdmin } = require("./routes/helper");
const imageRouter = require('./routes/image/image')
dotenv.config();
const app = express();



//golbal helper
app.use((req, res, next) => {
	global.request = () => req;
	global.response = () => res;
	next();
});

app.use(cors());
app.use(fileupload());
app.use(express.json());

/**
 * register router
 */
registerClient(app);
registerAdmin(app);
app.use(imageRouter)

app.use((error, req, res, next) => {
	if (error) {
		error.status = error.status ?? 500;
		error.success = error.success ?? false;
		error.message = error.message ?? "Sever Error!";
		console.log(error)
		return res.status(error.status).json(error.data ?? error);
	}
});

connectDB()
	.then(() => {
		app.listen(process.env.SERVER_PORT);
	})
	.catch((error) => {
		if (error) console.log("database connection error");
	});
