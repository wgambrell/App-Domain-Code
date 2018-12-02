const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Log = db.log;

// Post a Customer
exports.create = (req, res) => {
    // Save to postgres database
    let log = req.body;
    Log.create(log).then(result => {
        // Send created log to client
        res.json(result);
    });
};

// Fetch all logs
exports.findAll = (req, res) => {
    Log.findAll().then(log => {
        // Send all logs to Client
        res.json(log);
    });
};

exports.findAllSort = (req, res) => {
    let column = req.body.column;
    let direction = req.body.direction;
    let columnSearch = req.body.columnSearch;
    let criteria = req.body.criteria;
    //if search is set to all and there is criteria input
    if(columnSearch === 'all' && criteria!== '') {
        //if a search is entered
        Log.findAll({
            where: {
                [Op.or]: [{userName: {[Op.like]: '%'+ criteria + '%'}},
                    {actionType: {[Op.like]: '%'+ criteria + '%'}},
                    {prevData: {[Op.like]: '%'+ criteria + '%'}},
                    {newData: {[Op.like]: '%'+ criteria + '%'}},
                ]
            },
            order: [[column, direction]]
        }).then(logs => {
            // Send all customers to Client
            res.json(logs);
        });
    }
    else{
        //if search wasnt entered
        Log.findAll({
            where: {},
            order: [[column, direction]]
        }).then(logs => {
            // Send all customers to Client
            res.json(logs);
        });
    }
};


// Find a log by Id
exports.findById = (req, res) => {
    Log.findById(req.params.userName).then(log => {
        res.json(log);
    })
};

//Find a log by type
exports.findByType = (req, res) => {
    Log.findByType(req.params.actionType).then(log => {
        res.json(log);
    })
}