const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('./schemas/user');
const mongoose = require('mongoose');
const app = express()
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect('mongodb://SerG:strelok1996@ds117830.mlab.com:17830/1plus1tv', options);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

const User = mongoose.model('user', userSchema);

app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: '60dd06aa-cf8e-4cf8-8925-6de720015ebf',
    resave: false,
    saveUninitialized: false,
    name: 'sid'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        User.findOne({
            'username': username,
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
}));

app.use('/', routes);

app.post('/register', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(err => {
        if(err)
            res.json({success: false});
        else
            res.json({success: true})

    })
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    })
);

app.get('/loginFailure', function(req, res, next) {
    res.json({authenticate: false});
});

app.get('/loginSuccess', function(req, res, next) {
    res.json({authenticate: true});
});

app.use('/api', apiRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Listening on " + port);
});