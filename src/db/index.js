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


const queryHandler = (connection, err, callback) => {
    connection.release();
    if (err) {
        console.log(err);
        callback(true);
        return;
    }
}

const doQuery = (connection, sql, params, callback) => {
    connection.query(sql, params, function (err, results) {
        queryHandler(connection, err, callback);
        callback(false, results);
    });
}

const getConnectionAndQuery = (sql, params, callback) => {
    // get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        // make the query
        doQuery(connection, sql, params, callback);
    });
}

// Get all products from db
exports.listAllProducts = (callback) => {
    var sql = "SELECT * FROM products";
    getConnectionAndQuery(sql, null, callback);
};


exports.getProductByName = (name, callback) => {
    console.log("--> Looking for product with name ", name)
    var sql = "SELECT * FROM products WHERE name = ?";
    getConnectionAndQuery(sql, name, callback);
};

exports.getProductByOrderId = (id, callback) => {
    console.log("--> Looking for products for the order id = ", id)
    var sql = "SELECT products.id, products.name, products.merchant_id, products.price, products.status, products.created_at, \
    order_items.quantity FROM orders INNER JOIN order_items ON orders.id = order_items.order_id AND orders.id = ?  \
    INNER JOIN products ON order_items.product_id = products.id";
    getConnectionAndQuery(sql, id, callback);
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

            doQuery(connection, sql, [newId, product.name, parseInt(product.merchant_id), parseInt(product.price), product.status, product.created_at], callback);
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

        console.log("=> ORDER = ", order);

        // 1. insert row into orders table
        let sql = "INSERT INTO `orders` (user_id, status, created_at) VALUES (?, ?, ?)";

        // make the query
        connection.query(sql, [parseInt(order.user_id), order.status, order.created_at], function (err, results) {

            if (err) {
                console.log(err);
                callback(true);
                return;
            }

            // 2. insert each item ordered as one row inserted into the ordered_items table
            console.log("NUMBER OF ITEMS IN ORDER = ", order.items.length);

            sql = "INSERT INTO `order_items` VALUES (?, ?, ?)";
            for (let i = 0; i < order.items.length; i++) {
                getConnectionAndQuery(sql, [results.insertId, order.items[i].product_id, order.items[i].quantity], callback);
            }
            callback(false, results);
        });
    });
};
exports.addItemToOrder = (body, callback) => {

    const orderId = parseInt(body.order_id);
    const productId = parseInt(body.product_id);
    const quantity = parseInt(body.quantity);

    const sql = "INSERT INTO `order_items` VALUES(?, ?, ?)";
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        doQuery(connection, sql, [orderId, productId, quantity], callback);
    });
};

exports.generateProductReport = (callback) => {

    console.log("we are in generateProductReport");

    const sql = "SELECT products.id, products.name, sum(order_items.quantity) quantity FROM products \
            INNER JOIN order_items \
            ON products.id = order_items.product_id \
            GROUP BY products.id";

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        doQuery(connection, sql, null, callback);
    });
};