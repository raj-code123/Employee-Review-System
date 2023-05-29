require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware.js');
const sassMiddleware = require('node-sass-middleware'); 
const path = require('path');
const { PORT,SECRET_KEY } = process.env;
app.use(sassMiddleware({
    src:path.join(__dirname, './assets','sass'),
    dest: path.join(__dirname, './assets','css'),
    debug:true,
    outputStyle: 'expanded',
    prefix:'/css'
}));

// Add the following lines to configure body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    // todo change the secret before deployment in production mode
    secret:SECRET_KEY,
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge:(1000 * 60 * 20)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disable'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(PORT || 5000 ,(err) => {
    if (err) {
        console.log(`Error is running the server: ${err}`);
    }
    console.log(`server is running on port: ${PORT }`);
});

