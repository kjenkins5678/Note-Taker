// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3001;

// Do the special thing with the public folder
app.use(express.static(__dirname + '/public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read the Data
var db = require("./db/db.json");

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function(req, res) {
  
  howManyNotes = db.length;

  let noteID = howManyNotes + 1;

  let newNote = req.body;

  newNote["id"] = noteID;
  
  db.push(newNote);

  console.log(db);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
