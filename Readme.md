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

When mongodb is started,you will see:

Purging database...
Running 'C:\Users\Asus\AppData\Roaming\npm\node_modules\run-rs\6.0.0\mongod.exe' [ 27017, 27018, 27019 ]
Starting replica set...
Started replica set on **_mongodb://DESKTOP-OUSQB3M:27017,DESKTOP-OUSQB3M:27018,DESKTOP-OUSQB3M:27019?replicaSet=rs_**

# Environment setup

```
SERVER_PORT=4000
SECRET_CODE=$4785431548
TOKEN_TYPE=$1
APP_URL=http://localhost:4000
DB_PORT=mongodb://WAIYANLIN-PC:27017,WAIYANLIN-PC:27018,WAIYANLIN-PC:27019?replicaSet=rs
TIME_ZONE=Aisa/Yangon

MAIL_SERVICE=gmail
SEND_MAIL=bookshoptesting@gmail.com
SEND_MAIL_PASSWORD=riineoxdvqilwyly
MAIL_PORT=587
HOST=smtp.ethereal.email
```

Run Project:

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
-   MongoDB runner [run-s](https://www.npmjs.com/package/run-rs)
-   Date library is Day.js[Fast 2kB alternative to Moment.js with the same modern API
    ](https://day.js.org/)

# Frontend Sites
- Admin [dashboard](https://github.com/MimosaMimosa/node-booksho-admin)
- Client [pages](https://github.com/MimosaMimosa/node-book-shop-client)