const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const router = require("./routes/routelist");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

app.get("/upload/images/:id", (req, res) => {
	res.sendFile(__dirname + req.url);
});

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(cookieParser());
app.use(fileupload());
app.use(express.json());
app.use("/api/v1/authors", router.author);
app.use("/api/v1/books", router.book);
app.use("/api/v1/users", router.user);
app.use("/api/v1/auth", router.auth);
app.use("/api/v1/categories", router.category);

connectDB()
	.then(() => {
		app.listen(process.env.SERVER_PORT);
	})
	.catch((error) => {
		if (error) console.log("database connection error");
	});
