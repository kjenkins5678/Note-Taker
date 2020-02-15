// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

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
let rawdata = fs.readFileSync('./db/db.json');
let db = JSON.parse(rawdata);

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

  let noteID = howManyNotes;

  let newNote = req.body;

  console.log("post res: ", newNote)

  res.json(newNote);

  newNote["id"] = noteID;
  
  db.push(newNote);

  console.log(db);
  console.log(typeof db);
  console.log(db.length)

  let data = JSON.stringify(db);
  fs.writeFileSync('./db/db.json', data);
  console.log("Successfully wrote db file");
});

app.delete("/api/notes/:id", function(req, res){
  var selected = req.params.id;
  for(var i =0; i < db.length; i++)
  {
    if(selected == db[i].id)
    {
      db.splice(i,1);
      res.json(db);
    }
  }
  console.log(db);
  let data = JSON.stringify(db);
  fs.writeFileSync('./db/db.json', data);
  console.log("Successfully updated db file");
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
