const path = require("path");

module.exports = function(app){

    // Route for notes page
    app.get("/notes", function(req, res){
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Route to index page
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};