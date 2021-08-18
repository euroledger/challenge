
const cron = require('node-schedule');
const google = require('../src/spreadsheet');

// Get all products from db when scheduler fires
exports.scheduleProductReport = (database, callback) => {
    var rule = new cron.RecurrenceRule();

    // Monday 07:00 UTC time zone
    rule.dayOfWeek = [1];
    rule.hour = 7;
    rule.minute = 0;
    rule.tz = 'Etc/UTC';

    console.log(new Date(), 'Weekly Report Generation...');

    results = database.generateProductReport((err, results) => {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        // callback(results);
        google.uploadToGoogleSpreadsheet(results);
    });
};


