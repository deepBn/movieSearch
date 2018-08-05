var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

var request = require("request");
var apiKey = process.env.OMDBKEY;

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/search", function (req, res) {
    res.render("search");
});

app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=" + apiKey + "&s=" + query;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", {
                data: data
            });
        }
    });
});

app.get("/results/details/:title", function(req, res) {
    var title = req.params.title;
    var url = "http://www.omdbapi.com/?apikey=" + apiKey + "&plot=full&i=" + title;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("details", {
                data: data
            });
        }
    });
});

app.listen("3000", function () {
    console.log("Server running at port 3000");
});