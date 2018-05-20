module.exports = function(app) {
    let event = require('../controllers/eventController');

    // todoList Routes
    app.route('/events')
        .get(event.listAll)
        .post(event.create);


    app.route('/events/:eventId')
        .get(event.getEvent)
        .put(event.updateEvent)
        .delete(event.deleteEvent);

    app.route('/events/api/:eventId')
        .get(event.getEventByApi);
};