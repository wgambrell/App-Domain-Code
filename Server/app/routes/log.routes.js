module.exports = function(app) {

    var log = require('../controllers/userLog.controller.js');

    // Create a new user
    app.post('/api/log', log.create);

    // Retrieve all users
    app.get('/api/log', log.findAll);

    app.post('/api/logSort', log.findAllSort);

    // Retrieve a single user by Id
    app.get('/api/log/:log', log.findById);

    //Retrieve a log by type
    app.get('/api/log/:actionType', log.findByType);
}