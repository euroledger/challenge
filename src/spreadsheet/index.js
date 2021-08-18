const { google } = require('googleapis');
const sheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

exports.uploadToGoogleSpreadsheet = async (data) => {

    const spreadsheetId = process.env.SPREADSHEET_ID;

    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        scopes: SCOPES, 
    });

    let values = data.map((element) => {
        return {id: element.id, name: element.name, quantity: element.quantity};
    });
    
    console.log(values);

    console.log("Authorizing Google Sheets");
    const client = await auth.getClient();
    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    });

    // get metadata about sheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    });

    // console.log(metaData);
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "sheet1"
    });

    console.log(getRows.data);
}
