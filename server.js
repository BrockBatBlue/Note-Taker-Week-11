var fs = require("fs");
var express = require("express");
var path = require("path");
var notes = require("./db/db.json")

var app = express();
var PORT = 8080;

var overWriteDb = (data)=> {
    fs.writeFile("./db/db.json", JSON.stringify(data), (err)=> {
        if (err){
            return console.log(err);
        }
        console.log("Successfully updated DB");
    })
}
var deleteNote = (id)=> {
    notes

    overWriteDb(notes);
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






// Port Listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
// var server = http.createServer(handleRequest);


// function handleRequest(req, res){
//     var path = req.url;
//     console.log(path);
//     switch (path){
//         case "/notes":
        
//             return fs.readFile(__dirname + "/public/notes.html", function(err, data){
//                 if(err) throw err;
//                 res.writeHead(200, {"Content-Type": "text/html"});
//                 res.end(data);
//             });

        
//         default: 
//         return fs.readFile(__dirname + "/public/index.html", function(err, data){
//             if(err) throw err;
//             res.writeHead(200, {"Content-Type": "text/html"});
//             res.end(data);
//         });
//     }
// }

// server.listen(PORT, function(){
//     console.log("Server listening on: http://localhost:" + PORT);
// });