const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database');
const router = require('./routes/routelist');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

app.get('/upload/images/:id', (req, res) => {
    res.sendFile(__dirname + req.url);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type,Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cookieParser());
app.use(fileupload());
app.use(express.json());
app.use('/api/v1/authors', router.author);
app.use('/api/v1/books', router.book);
app.use('/api/v1/users', router.user);
app.use('/api/v1/auth', router.auth);
app.use('/api/v1/categories', router.category);

app.use((error, req, res, next) => {
    if (error) {
        console.log(res);
        const status = error.status || 500;
        const stack = error.stack;
        const success = error.success || false;
        const message = error.message || 'Sever Error!';
        return res.status(status).json({ success, stack, message, error });
    }
});

connectDB()
    .then(() => {
        app.listen(process.env.SERVER_PORT);
    })
    .catch((error) => {
        if (error) console.log('database connection error');
    });
