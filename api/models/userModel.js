let passport = require('passport');
let mongoose = require("mongoose")
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
    idFacebook: String,
    firstname: String,
    lastname: String,
    pwd: String,
    email: String,
    dateOfBirth: Date,
    picture: String,
    hobbies: {
        id: Number,
        name: String
    },
    events: [String],
    friends: [Number]
})

module.exports = mongoose.model('Users', UserSchema);