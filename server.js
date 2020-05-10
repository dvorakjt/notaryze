// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let noteDB = [];

//Read from db.json
fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    if (data) {
        noteDB = JSON.parse(data);
    }
    //Get Routes
    app.get("/", (req, res) => {
        res.sendFile("index.html");
    });

    app.get("/notes", (req, res) => {
        res.sendFile("notes.html", { root: "public" });
    });

    app.get("/api/notes", (req, res) => {
        return res.json(noteDB);
    });
    //Post Route
    app.post("/api/notes", (req, res) => {
        let newNote = req.body;
        console.log(newNote);
        noteDB.push(newNote);
        console.log(noteDB);
        fs.writeFile("./db/db.json", JSON.stringify(noteDB), (err) => {
            if (err) throw err;
            console.log("note saved!");
            return res.json(noteDB);
        });
    });

    //Delete Route
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});
