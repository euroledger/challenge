var router = require('express').Router();

var orderRoutes = function (db) {
    
    router.post('/', function (req, res, next) { 
        db.createOrder(req.body, (err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
        });
        res.sendStatus(200);
    });

    router.post('/new', function (req, res, next) {   
        db.addItemToOrder(req.body, (err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
        });
        res.sendStatus(200);
    });

    return router;

};

module.exports = orderRoutes;