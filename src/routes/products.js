/* in your router file */
var router = require('express').Router();

var productRoutes = function (db) {
    router.get('/', function (req, res, next) {
        // res.send('respond with a resource');
        db.listAllProducts((err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });
    router.get('/:name', function (req, res, next) {
        // res.send('respond with a named resource');
        db.getProductByName(req.params.name, (err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });
    
    router.post('/', function (req, res, next) {       
        db.addProduct(req.body, (err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
        });
        res.sendStatus(200);
    });

    return router;

};

module.exports = productRoutes;