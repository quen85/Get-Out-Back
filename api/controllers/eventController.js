let mongoose = require('mongoose'),
    Event = mongoose.model('Events');

exports.listAll = function(req, res) {
    Event.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};




exports.create = function(req, res) {
    let newEvent = new Event(req.body);
    newEvent.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.getEvent = function(req, res) {
    Event.findById(req.params.eventId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.getEventByApi = function(req, res) {
    Event.find({"idApi" : req.params.eventId}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.updateEvent = function(req, res) {
    Event.findOneAndUpdate({_id: req.params.eventId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.deleteEvent = function(req, res) {
    Event.remove({
        _id: req.params.eventId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};