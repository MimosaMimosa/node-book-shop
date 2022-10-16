const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database');
const router = require('./routes/routelist');
const fileupload = require('express-fileupload');
dotenv.config();

const app = express();

app.use(fileupload());
app.use(express.json());
app.use('/api/v1/authors', router.author);
app.use('/api/v1/books', router.book);
app.use('/api/v1/users', router.user);
app.use('/api/v1/auth', router.auth);
app.use('/api/v1/categories', router.category);

connectDB()
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`App is running at port ${process.env.SERVER_PORT}`);
        });
    })
    .catch((error) => {
        if (error) console.log('database connection error');
    });
