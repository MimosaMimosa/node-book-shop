const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const router = require("./routes/routelist");
const fileupload = require("express-fileupload");
const cors = require("cors");
dotenv.config();

const app = express();

app.get("/upload/images/:id", (req, res) => {
	res.sendFile(__dirname + req.url);
});

app.get("/upload/users/:id", (req, res, next) => {
	res.sendFile(__dirname + req.url);
});

app.get("/upload/authors/:id", (req, res, next) => {
	res.sendFile(__dirname + req.url);
});

app.use(cors());
app.use(fileupload());
app.use(express.json());
app.use("/api/v1/authors", router.author);
app.use("/api/v1/books", router.book);
app.use("/api/v1/users", router.user);
app.use("/api/v1/auth", router.auth);
app.use("/api/v1/categories", router.category);

app.use((error, req, res, next) => {
	if (error) {
		error.status = error.status ?? 500;
		error.success = error.success ?? false;
		error.message = error.message ?? "Sever Error!";
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
