const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let addNote = req.body;
    notes.push(addNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
      res.json(notes);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      let notes = JSON.parse(data);
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
        res.json(notes);
      });
    });
  });
  

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );




