# Installiation

To install:

```
npm install
```

```
npm install run-rs -g
```

Optional command before start mongodb(with window power shell):

```
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process
```

Start mongodb:

```
run-rs -v 6.0.0
```

if you want data persist next time

```
run-rs -v 6.0.0 --keep
```

Run Project

```
npm run dev
```

# When Project is started

You will see server is running at <http:/localhost:4000>

# Packages

-   Api develpoment for [Express JS](http://expressjs.com/).
-   Validation library is [Joi.](https://joi.dev/api/?v=17.7.0)
-   Mail Sevice [Node Mailer.](https://nodemailer.com/)
-   Elegant mongodb object modeling for node.js [mongoose](https://mongoosejs.com/)
-   Hashing [bcryptjs.](bcryptjs)
-   Auth Token [jsonwebtoken.](https://www.npmjs.com/package/jsonwebtoken)
-   MongoDB runner[run-s](https://www.npmjs.com/package/run-rs)
