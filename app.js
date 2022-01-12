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

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};
const Article = mongoose.model("Article", articleSchema);




// app.get("/articles", function(req, res){
// Article.find({}, function(err, result){
//   if(!err){
//     res.send(result);
//   }else{
//     res.send(err);
//   }
// })
// });
//
// app.post("/articles", function(req, res){
//   const title = req.body.title;
//   const content = req.body.content;
//   const newArticle = new Article({
//     title: title,
//     content: content
//   });
//   newArticle.save(function(err){
//     if(!err){
//       res.send("Successfully posted new article");
//     }else{
//       res.send(err);
//     }
//   });
//
//
// });
//
// app.delete("/articles", function(req, res){
//   Article.deleteMany(function(err){
//     if(!err){
//       res.send("Successfully deleted all articles");
//     }else{
//       res.send(err);
//     }
//   })
// })

//Creating chained route handler using express
app.route("/articles")
  .get(function(req, res){
  Article.find({}, function(err, result){
    if(!err){
      res.send(result);
    }else{
      res.send(err);
    }
  });
  })
  .post(function(req, res){
    const title = req.body.title;
    const content = req.body.content;
    const newArticle = new Article({
      title: title,
      content: content
    });
    newArticle.save(function(err){
      if(!err){
        res.send("Successfully posted new article");
      }else{
        res.send(err);
      }
    });


  })
  .delete(function(req, res){
    Article.deleteMany(function(err){
      if(!err){
        res.send("Successfully deleted all articles");
      }else{
        res.send(err);
      }
    });
  });

 app.route("/articles/:title")
    .get(function(req, res){
      const title = req.params.title;
      Article.findOne({title: title}, function(err, result){
        if(!err){
          res.send(result);
        }else{
          res.send("No article with that title was found");
        }
      });
    })
    .put(function(req, res){
      const newTitle = req.body.title;
      const newContent = req.body.content;
      Article.findOneAndUpdate({title: req.params.title}, {title: newTitle, content: newContent}, {returnOriginal: false}, function(err){
        if(err){res.send("Could not be updated");
      }else{res.send("Successfully updated");}
      });
    })
    .patch(function(req, res){
      Article.findOneAndUpdate({title: req.params.title}, {$set: req.body}, {returnOriginal: false}, function(err){
        if(!err){
          res.send("Successfully patched collection item");
        }else{
          res.send(err);
        }
      });
    })
    .delete(function(req, res){
      const deletePost = req.params.title;
      Article.deleteOne({title: req.params.title}, function(err){
        if(!err){
          res.send("Succesfully delete article");
        }else{
          res.send(err);
        }
      });
    });





app.listen(3000, function(){
  console.log("Server running on port 3000");
});
