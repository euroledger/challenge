var router = require('express').Router();

var orderRoutes = function (db) {
    
    router.post('/', function (req, res, next) { 
        console.log("IN createorder")      
        db.createOrder(req.body, (err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
        });
        res.sendStatus(200);
    });

    router.post('/new', function (req, res, next) {   
        console.log("In wrong one");   
  
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