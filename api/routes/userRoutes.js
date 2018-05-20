module.exports = function(app) {
    let user = require('../controllers/userController');

    // todoList Routes
    app.route('/users')
        .get(user.listAll)
        .post(user.create);


    app.route('/users/:userId')
        .get(user.getUser)
        .put(user.updateUser)
        .delete(user.deleteUser);
};