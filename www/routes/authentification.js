let express = require('express');
let passport = require('passport');
let router = express.Router();
let mongoose = require('mongoose'),
    User = mongoose.model('Users');

router.get('/', function(req, res, next) {
    console.log(req.query);
});

router.post('/', function (req, res) {
    let email = req.body.email
    let pwd = req.body.pwd
    let message
    console.log(email)
    console.log(pwd)

    User.findOne({email: email}, function(err, user){
        console.log(user)
        if(user) {
            if(user.pwd === pwd){
                res.json(user)
            }
            else {
                return message = "Mauvais mot de passe"
            }
        }
        else {
            return message = "Aucun compte n'existe avec cet email"
        }

    })
})

router.get('/facebook', function(req, res){
    User.findOne({ idFacebook: req.query.idFacebook }, function (err, user) {
        if(!user){
            res.json({});
        }
        else{
            console.log(user)
            res.json(user);
        }
    })
});

router.post('/facebook', function (req, res) {
    let user = new User(req.body);
    user.save(function(error, task) {
        if (error)
            console.log(error)
        res.json(task)
    });
})

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        const id = req.user._id;
        res.redirect('/?user=' + id);
    });

module.exports = router;