const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const client = require("./routes/client/routelist");
const fileupload = require("express-fileupload");
const cors = require("cors");
const { registerClient } = require("./routes/helper");
dotenv.config();

const app = express();

app.get(/(upload).*/, (req, res) => {
	res.sendFile(__dirname + req.url);
});

// app.get(/(secret).*/,(req,res)=> res.send('ggg'))

// app.get("/upload/users/:id", (req, res, next) => {
// 	res.sendFile(__dirname + req.url);
// });

// app.get("/upload/authors/:id", (req, res, next) => {
// 	res.sendFile(__dirname + req.url);
// });

app.use(cors());
app.use(fileupload());
app.use(express.json());

/**
 * register router
 */
registerClient(app,client,'v1')

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
