//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hello Everyone My name is Karthik Shetty am a student in Nmamit and pursuing my Information Science engineering degree, I did this simple daily Blog website using  using NodeJS and MongoDB as a part of learning adventure in the domain of web Technologies. Stay tuned for daily blogs about Technologies and college related Stuff.";
const aboutContent = "I am from 2023 batch and my USN is 4NM19IS075. I am a resident of Mangalore Kadri Kambla ";
const contactContent = "Email: karthikshetty442@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connecting a database.
mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
  title: String,
  content: String
}
//creating model based on above Schema
const Post = mongoose.model("Post", postSchema);



app.get("/", function(req, res){
  Post.find({},function(err, posts){
    res.render("home",{
      startingContent: homeStartingContent,
      posts: posts
    });
  })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  //crating document based on the Post model
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

 post.save(function(err){
   if(!err){
     res.redirect("/");
   }
 });
});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
