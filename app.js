var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var app = express();

//Config
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

//DB
mongoose.connect("mongodb://localhost/tksblogapp");

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//Routes
app.get("/", function(req, res){
	res.redirect("/blogs");
})

app.get("/blogs/new", function(req, res){
	res.render("new");
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index", {blogs: blogs})
		}
	});
});

app.post("/blogs", function(req, res){
	Blog.create(req.body.blog , function(err, newBlog){
			if(err){
				console.log(err);
			}else{
				res.redirect("/blogs");
			}
	})
});

app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log(err);
		}else{
			res.render("show", {blog: foundBlog});
		}
	})
})

app.listen(3000, "localhost", function(){
	console.log("App is running");
})
