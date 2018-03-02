var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

var request = require("request");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/search", function (req, res) {
    res.render("search");
});

app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", {
                data: data
            });
        }
    });
});

app.listen("3000", function () {
    console.log("Server running at port 3000");
});