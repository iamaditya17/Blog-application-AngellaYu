const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set("view engine", "ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let newPostArr = [];

app.get("/", (req, res) => {
    res.render("home" , {homeContent : homeStartingContent , postArr : newPostArr });
})

app.get("/about", (req, res) => {
    res.render("about", { aboutPageContent: aboutContent });
})

app.get("/contact", (req, res) => {
    res.render("contact", { contactPageContent: contactContent });
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.post("/compose", (req, res) => {

    const newPost = {

        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    };

    newPostArr.push(newPost);

    res.redirect("/");

    
})

// Express Route parameters

/*
app.get('/posts/:postName', (req, res) => {

    //console.log(req.params.postName);    it will give the route page name (dynamic URLrs)

    const requestedTitle = _.lowerCase(req.params.postName);   // converts the name into lowercase and return the name by ignoring all the spaces and "-"

    newPostArr.forEach((post) => {

        const postTitle = _.lowerCase(post.postTitle);

        if (requestedTitle === postTitle) {
            console.log("Match-Found");
        }
        else {
            console.log("Not Found");
        }
    })
});

*/

app.get('/posts/:postName', (req, res) => {
    
    const requestedTitle = _.lowerCase(req.params.postName); 

    newPostArr.forEach((post) => {

        const postTitle = _.lowerCase(post.postTitle);

        const postBody = post.postBody;
        const originalPostTitle = post.postTitle;

        if (requestedTitle === postTitle) {
            
            res.render("post", {postTitle : originalPostTitle , postContent : postBody})
        }
        else {
            res.send("<h1>page not found</h1>");
        }
    })


})


app.listen(3000, () => console.log("Server is listening to port 3000"));


// if a server is already running and we Type "rs" in the terminal then it restart the server

//How to search a problem's solution in google : verb + object + programming language (e.g  truncate string JS)