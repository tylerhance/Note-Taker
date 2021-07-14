const fs = require("fs");
const noteData = require("../db/db.json");

module.exports = function(app){

    function writeToDb(notes){
        // Converts new JSON array into a string 
        notes = JSON.stringify(notes);
        console.log (notes);
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    // GET method to return all notes
    app.get("/api/notes", function(req, res){
        res.json(noteData);
    });

    // POST method to add/update notes
    app.post("/api/notes", function(req, res){

        // Sets unique ID to note
        if (noteData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(noteData[noteData.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        noteData.push(req.body);

        // Write notes data to database
        writeToDb(noteData);
        console.log(noteData);

        // returns new note in JSON
        res.json(req.body);
    });

    // DELETE method to delete note with specified ID
    app.delete("/api/notes/:id", function(req, res){
        
        // Grabs the ID and converts to a string
        let id = req.params.id.toString();
        console.log(id);

        // Deletes note with correlating ID in the notes array
        for (i = 0; i < noteData.length; i++){
           
            if (noteData[i].id == id){
                console.log("Found a matching note id for deletion.");
                res.send(noteData[i]);

                // Removes the deleted note
                noteData.splice(i,1);
                break;
            }
        }

        // Writes notes data to database
        writeToDb(noteData);

    });
};