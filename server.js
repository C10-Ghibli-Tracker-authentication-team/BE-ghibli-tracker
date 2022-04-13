const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')
const router = require('./network/routes');
const passport = require('passport');
require('./utils/strategies')
require('dotenv').config();


db(`mongodb+srv://${process.env.MONGOATLAS_USER}:${process.env.MONGOATLAS_PASSWORD}@cluster0.v65cq.mongodb.net/${process.env.MONGOATLAS_APPNAME}?retryWrites=true&w=majority`)
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
router(app);

app.use('/app', express.static('public'));   //servir estáticos desde la carpeta public

app.listen(process.env.PORT);
console.log(`La aplicacion esta escuchando en el puerto ${process.env.PORT}`);