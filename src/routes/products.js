var express = require('express');
const mysql = require('mysql');
const db = require('../db');
var router = express.Router();

/* GET products listing. */
router.get('/', async (req, res, next) => {
    //   res.send("Here is a product");

    db.listAllProducts((err, results) => {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        // Respond with results as JSON
        res.send(results);
    });

});

module.exports = router;
