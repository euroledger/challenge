var router = require('express').Router();

var orderItemRoutes = function (db) {
    
    router.get('/', function (req, res, next) {   
        let id = parseInt(req.body.id) 
        db.getProductByOrderId(id, (err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            res.send(results);
        });
    });

    return router;

};

module.exports = orderItemRoutes;