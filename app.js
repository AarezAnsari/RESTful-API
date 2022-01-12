const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const app = express();


//Allow server to send static files to client
app.use(express.static("Public"));

//Allow ejs to render to html pages
app.set('view engine', 'ejs');

//Allow use of bodyParser to retrieve user information
app.use(bodyParser.urlencoded({
extended: true
}));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String
};
const Article = mongoose.model("Article", articleSchema);



app.listen(3000, function(){
  console.log("Server running on port 3000");
});
