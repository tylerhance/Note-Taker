const fs = require("fs");
const noteData = require("../db/db.json");

module.exports = function (app) {

    function writeToDB(notes){
        notes = JSON.stringify(notes);
        console.log(notes);
        fs.writeFileSync("../db/db.json", notes, function(err){
            if(err){
                return console.log(err);
            }
        })
    }
};

// GET method for returning all notes
app.get("/api/notes", function(req, res){
    res.json(noteData);
});

//POST method for updating/adding notes
app.post("api/notes", function(req, res){
    if(noteData.length == 0){
        res.body.id = "0";
    }else{
        req.body.id = JSON.stringify(JSON.parse(noteData[noteData.length - 1].id)+ 1);
    }
    console.log("req.body.id: " + req.body.id);

    noteData.push(req.body);

    writeToDB(noteData);
    console.log(noteData);

    res.json(req.body);
});

// DELETE method for deleting note with unique ID
app.delete("/api/notes/:id", function(req, res){
    let id = req.params.id.toString();
    console.log(id);

    for(i = 0; i < noteData.length; i++){
        if(noteData[i].id == id){
            console.log("It's a match!");
            res.send(noteData[i]);

            noteData.splice(i,1);
            break;
        }
    }

    // Write notes to database
    writeToDB(noteData);
});
