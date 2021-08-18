const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const scheduler = require('./scheduler');

var app = function (database) {

    scheduler.scheduleProductReport(database, (results) => {
        console.log("Report...");
        console.log(results);
    });

    const productRoutes = require('./routes/products')(database);
    const orderRoutes = require('./routes/orders')(database);
    const orderItemRoutes = require('./routes/orderItems')(database);
    const reportRoutes = require('./routes/reports')(database);

    const app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));


    app.use('/', indexRouter);
    app.use('/products', productRoutes);
    app.use('/products/:name', productRoutes);
    app.use('/addproduct', productRoutes);
    app.use('/createorder', orderRoutes);
    app.use('/createorder/new', orderRoutes);
    app.use('/productsbyid', orderItemRoutes);
    app.use('/generatereport', reportRoutes);


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    return app;
}
module.exports = app;
