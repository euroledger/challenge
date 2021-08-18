var router = require('express').Router();

var reportRoutes = function (db) {
    router.get('/', function (req, res, next) {   
        console.log("REPORT!!")
        db.generateProductReport((err, results) => {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            // Respond with results as JSON
            res.send(results);
        });
    });
    return router;
};

module.exports = reportRoutes;