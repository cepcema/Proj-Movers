const PORT = process.env.PORT || 8000;
const express = require("express");
const { google } = require("googleapis");
const cors = require(`cors`);
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const spreadsheetId = "1DucEU05O4E0UL3yGuF_I6YfyHsr6NypkBnZzIneQ_xs";
    //   // Create client instance for auth
    const client = await auth.getClient();
    //   // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    //   // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //   // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Top Gainers",
    });

    res.send(getRows.data);
});

// app.post("/", async (req, res) => {
//   const { request, name } = req.body;

//   // Write row(s) to spreadsheet
//   await googleSheets.spreadsheets.values.append({
//     auth,
//     spreadsheetId,
//     range: "Sheet1!A:B",
//     valueInputOption: "USER_ENTERED",
//     resource: {
//       values: [[request, name]],
//     },
//   });

//   res.send("Successfully submitted! Thank you!");
// });

app.listen(process.env.PORT || 8000, (req, res) =>
    console.log(`Runinn on ${PORT}`)
);