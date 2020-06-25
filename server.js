var fs = require("fs");
var express = require("express");
var path = require("path");
var notes = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 3001;

var overWriteDb = (data)=> {
    fs.writeFile("./db/db.json", JSON.stringify(data, null, 2), (err)=> {
        if (err){
            return console.log(err);
        }
        console.log("Successfully updated DB");
    })
}
var deleteNote = (id)=> {
    console.log("deleting", id);
    var deleteIndex
    notes.forEach((note, index)=> {
        if (id === note.id){
            deleteIndex = index
        }
    })
    if(deleteIndex !== undefined) {
        notes.splice(deleteIndex,1)
        overWriteDb(notes);
        console.log("note deleted");
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get api notes --- routing
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// Note-Taker API -- Get
app.get("/api/notes", (req, res)=> {
    return res.json(notes)
});


// Note-Taker API -- Post
app.post("/api/notes", (req, res)=> {
    var newNote = req.body;
    newNote.id = notes[notes.length - 1].id + 1;
    notes.push(newNote);
    overWriteDb(notes);
    console.table(notes);
    res.json(notes);
});

// DELETE id and notes

app.get("/api/notes/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    deleteNote(id);
    return res.json(notes);
})


// Port Listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
