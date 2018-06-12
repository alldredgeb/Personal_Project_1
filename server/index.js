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
    // console.log('profile', profile);
    //db query to check if user exists. 
    //then, if they do exist, pass their id into 'done': done(null, id)
    //if they do not exist, create the user in the db and then pass their id into done(null, id)
    app.get('db').check_user(profile.id).then( checkUserResults => {
      console.log('check user', checkUserResults);
      if(checkUserResults[0]) {
        done(null, checkUserResults[0].id);
      } else {
        app.get('db').create_user(profile.id).then( createUserResults => {
          done(null, createUserResults[0].id);
        })
      }
    })
  }
))

//serializeUser sets the cookie that will be stored in the front end
passport.serializeUser((id, done) => {
  console.log('serialize', id);
  done(null, id);
});
//deserializeUser takes the cookie from the front end and decides what will be accessible on sessions
passport.deserializeUser((id, done) => {
  console.log('deserialize', id);
  // db query to get all the user's information using the id, and pass that returning information into done
  app.get('db').get_user_info(id).then( getUserResults => {
    done(null, getUserResults[0]);
  })
})

//ENDPOINTS
/////Create/////
//app.post('/api/add_to_cart’)

/////Read/////
app.get('/api/auth/login', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/', 
  failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/api/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(`https://leroy-jones.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${process.env.CLIENT_ID}`)
})

app.get('/api/get_all_user_info', (req, res) => {
  if(req.user) {
    console.log('session', req.user);
    res.status(200).send(req.user)
  } else {
    return res.status(403).send("User not logged in.");
  }
})

app.get('/api/get_cart_item_count', (req, res) => {
  app.get('db').get_cart_item_count(+req.user.id).then( cartItemCountResults => {
    res.status(200).send(cartItemCountResults[0].sum)
  }).catch( error => {
    console.log('get cart info query error', error);
    res.status(500).send(error);
  });
})

app.get('/api/get_products/:category', (req, res) => {
  app.get('db').get_products(req.params.category).then( categoryProductsResponse => {
    res.status(200).send(categoryProductsResponse)
  }).catch( error => {
    console.log( 'get category products query error', error);
    res.status(500).send(error);
  });
})

app.get('/api/check_number_of_pages/:category', (req, res) => {
  app.get('db').check_number_of_pages(req.params.category).then( numberOfPagesResponse => {
    res.status(200).send(numberOfPagesResponse)
  }).catch ( error => {
    console.log('check number of pages query error', error);
    res.status(500).send(error);
  })
})

app.get('/api/get_other_products/:category/:offset', (req, res) => {
  app.get('db').get_other_products(req.params.category, req.params.offset).then( otherProductsResponse => {
    res.status(200).send(otherProductsResponse)
  }).catch( error => {
    console.log( 'get other products query error', error);
    res.status(500).send(error);
  });
})


app.get('/api/get_product/:id', (req, res) => {
  app.get('db').get_individual_product(req.params.id).then( individualProductResponse => {
    res.status(200).send(individualProductResponse)
  }).catch( error => {
    console.log( 'get individual product query error', error);
    res.status(500).send(error);
  })
})

//app.get(‘/api/search’) (user url query)

/////Update/////
//app.put('/api/update_quantity/:id') (carry amount on body)
//app.put('/api/finish_check_out') (have a purchased column say ‘true’)

/////Delete/////
//app.delete('/api/delete_from_cart/:id')

//LISTEN
app.listen(port, () => console.log(`listening on port ${port}!`));