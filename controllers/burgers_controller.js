var express = require('express');

var router = express.Router();

// Import data model.
var db = require('../models');


// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
    res.redirect('/burgers')
});

router.get('/burgers', function (req, res) {
    db.Burger.findAll({
         
    }).then(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});


router.post('/burgers/create', function (req, res) {
    var burgerName = req.body.name;
    db.Burger.create({
        burger_name: burgerName
    }).then(function () {
        res.redirect('/');
    });
});


router.put('/burgers/update/:id', function (req, res) {
    var devoured = false;
    var ID = req.params.id;

    db.Burger.update(
        {devoured: devoured},
        {where: {id: ID}}
    ).then(function () {
        res.redirect('/');
    });
});

// Export routes for server.js to use.
module.exports = router;