let mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.listAll = function(req, res) {
    User.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};




exports.create = function(req, res) {
    let newUser = new User(req.body);
    newUser.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.getUser = function(req, res, next) {
    User.findOne({"_id": req.params.userId}, function(err, task) {
        res.json(task);
    });
};


exports.updateUser = function(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.deleteUser = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};