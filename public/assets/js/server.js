//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//Set the app and port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

//allow the app to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/notes", (req, res) => {
    console.log("note page requested!");
});

app.get("/api/notes", (req, res) => {
    console.log("notes requested");
    res.sendFile("db.json");
});

//Initialize the server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});