//IMPORTS / REQUIRES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
require('dotenv').config();

//VARIABLES
const app = express();
const port = 3008;

//TOP LEVEL MIDDLEWARE
app.use(bodyParser.json());
// app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.DATABASE).then(function(db) {
  app.set('db', db);
});

passport.use(new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid profile email'
  }, 
  function(accessToken, refreshToken, extraParams, profile, done){
    console.log('profile', profile);
    app.get('db').check_user(profile.id).then( checkUserResults => {
      // console.log('check user', checkUserResults);
      if(checkUserResults[0]) {
        done(null, checkUserResults[0].id);
      } else {
        app.get('db').create_user(profile.id).then( createUserResults => {
          done(null, createUserResults[0].id);
        })
      }
    })
    done(null, profile);
  }
))

passport.serializeUser((id, done) => {
  console.log('serialize', id);
  done(null, id);
});
passport.deserializeUser((id, done) => {
  console.log('deserialize', id);
  done(null, id);
})

//ENDPOINTS
/////Create/////
//app.post('/api/add_to_cart’)

/////Read/////
app.get('/api/login', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/', 
  failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/api/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(`https://leroy-jones.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${process.env.CLIENT_ID}`)
})

app.get('/api/check_login', (req, res) => {
  if(req.user) {
    console.log('session', req.user);
    res.status(200).send(req.user)
  } else {
    return res.status(403).send("User not logged in. Access denied.");
  }
})
//app.get('/api/get_products/:category')
//app.get(‘/api/get_product/:id’)
//app.get(‘/api/search’) (user url query)

/////Update/////
//app.put('/api/update_quantity/:id') (carry amount on body)
//app.put('/api/finish_check_out') (have a purchased column say ‘true’)

/////Delete/////
//app.delete('/api/delete_from_cart/:id')

//LISTEN
app.listen(port, () => console.log(`listening on port ${port}!`));