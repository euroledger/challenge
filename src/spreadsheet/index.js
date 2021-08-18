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
        return [element.id, element.name, element.quantity];
    });
    
    // add column headers to front of array
    values.unshift(["PRODUCT ID", "PRODUCT NAME", "QUANTITY"]);

    console.log(values);

    console.log("Authorizing Google Sheets");
    const client = await auth.getClient();
    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    });
    // clear the sheet
    await googleSheets.spreadsheets.values.clear({
        auth,
        spreadsheetId,
        range: "sheet1",
    });

    // write the data to the sheet
    console.log("Writing data to sheet...");
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "sheet1",
        valueInputOption: "RAW",
        resource: {
            values
        }
    });
    console.log("Done!");

}
