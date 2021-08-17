var mysql = require('mysql');

// MYSQL_USER='root'
// MYSQL_PASSWORD='password'
// MYSQL_HOST='localhost'
// MYSQL_PORT='3306'
// MYSQL_DATABASE='testdb'

console.log(`Connecting to MySQL database ${process.env.MYSQL_DATABASE} on host ${process.env.MYSQL_HOST} and port ${process.env.MYSQL_PORT}`);
console.log(`    => user: ${process.env.MYSQL_USER}`);
console.log(`    => password: ${process.env.MYSQL_PASSWORD}`);

const dbConnectionInfo = {
    // connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT

};

// var pool = mysql.createPool();

var dbconnection = mysql.createConnection(
   dbConnectionInfo
);

dbconnection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... error = ", err);
    }
});

// console.log(pool);

// Get all products
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