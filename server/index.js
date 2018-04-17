const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const session = require('express-session')
const Auth0Strategy = require('passport-auth0')
const cors = require('cors');
const axios = require('axios');
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
app.use(cors());

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
}, function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db')

    db.find_user([profile.id]).then( userResult => {
        // console.log('profile', profile)
        if(!userResult[0]){
            console.log('New Member')
            db.create_user([
                profile.id,
                profile.displayName,
                profile.picture
            ]).then( createdUser => {
                return done(null, createdUser[0].id)
            })
        } else {
            console.log('Previous Member')
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

app.get('/auth/me', function(req, res){
    if(req.user){
        res.status(200).send(req.user);
    } else {
        res.status(401).send('nice try suckah');
    }
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
})

app.get('/favoriteLists/:name/:user_id', (req, res) => {
    app.get('db').check_duplicates(req.params.name, req.params.user_id)
    .then(results => {
        res.status(200).json(results)
    })
})

app.post('/favoriteLists', (req, res) => {
    app.get('db').create_list(req.body.currentLocation)
    .then(results => {
        res.status(200).json(results);
    })
})

app.post('/savedLists/:listName/:index', (req, res) => {
    req.body.restaurantList.map((val, i) => {
        return app.get('db').save_list(req.params.listName, val.name, val.rating, req.body.user.auth_id, req.params.index)
    })
    res.sendStatus(200);
})

app.delete('/savedLists/:listName', (req, res) => {
    console.log('hittin')
    app.get('db').delete_favorites(req.params.listName)
    .then(results => {
        res.status(200).json(results);
    })
})

app.get('/savedLists', (req, res) => {
    app.get('db').display_favorites(req.user.id)
    .then(results => {
        res.status(200).json(results);
    })
})


app.put('/savedLists/:listName/:user_id/:newName', (req, res) => {
    app.get('db').edit_favorites_name(req.params.user_id, req.params.listName, req.params.newName)
    .then(results => {
        res.status(200).json(results);
    })
})

app.get('/retrieveList/:listName/:user_id', (req, res) => {
    app.get('db').find_favorites(req.params.listName, req.params.user_id)
    .then(results => {
        res.status(200).json(results);
    })
})

app.get('/getNewRestaurantList/:name/:id', (req, res) => {
    app.get('db').get_restaurant_id(req.params.name, req.params.id)
    .then(results => {
        res.status(200).json(results)
    })
})

app.put('/updateFavorites/:id/:name', (req, res) => {
    app.get('db').update_favorites(req.params.id, req.params.name)
    .then(results => {
        res.sendStatus(200)
    })
})

app.listen(SERVER_PORT, () => console.log(`Magic Happens at Port: ${SERVER_PORT}`))