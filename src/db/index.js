var mysql = require('mysql');
const orderRoutes = require('../routes/orders');

console.log(`Connecting to MySQL database ${process.env.MYSQL_DATABASE} on host ${process.env.MYSQL_HOST} and port ${process.env.MYSQL_PORT}`);
console.log(`    => user: ${process.env.MYSQL_USER}`);
console.log(`    => password: ${process.env.MYSQL_PASSWORD}`);

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT

});

// check if createPool succeeded...do some simple query
pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('Connection Pool created; we are good to go...');
});


// Get all products from db
exports.listAllProducts = (callback) => {
    var sql = "SELECT * FROM products";

    // get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        // make the query
        connection.query(sql, function (err, results) {
            connection.release();
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};

const doQuery = (sql, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        // make the query
        connection.query(sql, function (err, results) {
            connection.release();
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
}

exports.getProductByName = (name, callback) => {
    console.log("--> Looking for product with name ", name)
    var sql = "SELECT * FROM products WHERE name = ?";

    // get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        // make the query
        connection.query(sql, name, function (err, results) {
            connection.release();
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};

exports.addProduct = (product, callback) => {
    let sql = "SELECT max(id) as maxId FROM products";

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        // make the query
        connection.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            var newId = Object.assign({}, results[0]).maxId + 1;
            sql = "INSERT INTO `products` VALUES (?, ?, ?, ?, ?, ?)";

            connection.query(sql, [newId, product.name, parseInt(product.merchant_id), parseInt(product.price), product.status, product.created_at], function (err, results) {
                console.log(results);
                connection.release();
                if (err) {
                    console.log(err);
                    callback(true);
                    return;
                }
            });
            callback(false, results);
        });
    });
};

exports.createOrder = (order, callback) => {

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        console.log(">>> ORDER = ", order);

        // 1. insert row into orders table
        let sql = "INSERT INTO `orders` (user_id, status, created_at) VALUES (?, ?, ?)";

        // make the query
        connection.query(sql, [parseInt(order.user_id), order.status, order.created_at], function (err, results) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }

            console.log("last id = ", results.insertId);

            // 2. insert each item ordered as one row inserted into the ordered_items table
            console.log("NUMBER OF ITEMS IN ORDER = ", order.items.length);

            sql = "INSERT INTO `order_items` VALUES (?, ?, ?)";

            for (let i = 0; i < orders.items.length; i++) {
                connection.query(sql, [results.insertId, order.items[i].product_id, order.items[i].quantity], function (err, results) {
                    console.log(results);
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                });
            }
            callback(false, results);
        });
    });
};