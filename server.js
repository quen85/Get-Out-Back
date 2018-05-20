let express = require('express')

let port = 8080
let app = express()

let path = require('path')

let mongoose = require('mongoose')

let Event = require('./api/models/eventModel')
let Users = require('./api/models/userModel')

let userController = require('./api/controllers/userController')

let bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://qgiraud:${process.env.MongoPwd}@ds129540.mlab.com:29540/eventdb`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let routes = require('./api/routes/eventRoutes');
let routesUser = require('./api/routes/userRoutes');
routes(app);
routesUser(app)

let passport = require('passport');

let FacebookStrategy = require('passport-facebook').Strategy;
let config = require('./fb.js');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('facebook', new FacebookStrategy({
        clientID        : config.facebook.clientID,
        clientSecret    : config.facebook.clientSecret,
        callbackURL     : config.facebook.callbackURL,
        profileFields: ['id', 'emails', 'name', 'birthday', 'gender', 'picture.type(large)']
    }, function(accessToken, refreshToken, profile, cb) {
    console.log('here')
    Users.findOne({ idFacebook: profile.id }, function (err, user) {
            console.log(user.token)
            if(!user){
                let newUser = new Users({
                    idFacebook: profile.id,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    picture: profile.photos[0].value,
                });
                newUser.save(function(error, task) {
                    console.log(error)
                });
            }
            return cb(err, user);
        });
    }
));

let authentification = require('./www/routes/authentification');

app.use('/authentification/', authentification);

app.route('/')
    .get(function(req, res){
        let user = Users.findById(req.query.user, function(err, doc){
            res.json(doc);
        })
    });

app.listen(process.env.PORT || port)