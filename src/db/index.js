var mysql = require('mysql');

// MYSQL_USER='root'
// MYSQL_PASSWORD='password'
// MYSQL_HOST='localhost'
// MYSQL_PORT='3306'
// MYSQL_DATABASE='testdb'

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