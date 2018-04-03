const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const session = require('express-session')
const Auth0Strategy = require('passport-auth0')
require('dotenv').config();

const {
    SERVER_PORT,
    SERVER_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
}) //creating connection between Heroku and my db folder containing my sql files

app.use(session({
    secret: SERVER_SECRET,
    resave: false,
    saveUninitialized: true
})) //creating local session

app.use(passport.initialize()); //initializing passport
app.use(passport.session()); //creating passport session

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')

    db.find_user([profile.id]).then(userResult => {
        if (!userResult[0]) {
            db.create_user([
                profile.displayName,
                profile.id,
                profile.picture
            ]).then( createdUser => {
                return done(null, createdUser[0].id)
            })
        } else {
            return done(null, userResult[0].id)
        }
    })
}))
passport.serializeUser((id, done) => {
    done(null, id) //puts profile info into the session
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then( loggedInUser => {
        done(null, loggedInUser[0]);
    }) //runs after each endpoint is hit after log in, puts info on req.user
})
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: 'http://localhost:3000/#/dashboard', //after build it will need to change from 3000 to 3005
    failureRedirect: 'http://localhost:3000'
}))

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
})


app.listen(SERVER_PORT, () => console.log(`Magic Happens at Port: ${SERVER_PORT}`))