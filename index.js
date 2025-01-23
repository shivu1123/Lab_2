            // const express=require("express")
            // const app=express();
            // let port = 3000;
            // const path=require("path")

            // app.use(express.urlencoded({extends:true}))
            // const { v4: uuidv4 } = require('uuid');
            // const methodOverride =require("method-override")
            // app.use(methodOverride('_method'))

            // app.set("view engine","ejs")
            // app.set("views",path.join(__dirname,"views"))
            // app.use(express.static(path.join(__dirname,"public")))


            // let data=[
            //     {
            //         "id":uuidv4(),
            //         "username":"abhipatel88",
            //         "content":"WORKing hard is important in our life for creating sccessful life"
            //     },
            //     {
            //         "id":uuidv4(),
            //         "username":"aangishah",
            //         "content":"Enjoy your life"
            //     },
            //     {
            //         "id":uuidv4(),
            //         "username":"Dhruvi",
            //         "content":"Don't take stress"
            //     }
            // ]






            // app.get("/posts",(req,res)=>{
            //     res.render("index.ejs",{data})

            // })

            // app.get("/posts/new",(req,res)=>{
            //     res.render("new.ejs")

            // })
            // app.post("/posts",(req,res)=>{
            //     let {username,content}= req.body;
            //     let id=uuidv4();

            //     data.push({id,username,content})
            //     // res.send(`post getted in page`)
            //     res.redirect("/posts")
            // })
            // app.get("/posts/:id",(req,res)=>{
            //     let{id}=req.params;
            //     // console.log(id)
            //     let post =data.find((p)=> id === p.id)
            //     console.log(post)
            //     res.render("show.ejs",{post})
            //     // res.send("hdi")
            // })
            // app.patch("/posts/:id",(req,res)=>{
            //     let{id}=req.params;
            //     let newc=req.body.content;
            //     let post =data.find((p)=> id === p.id)
            //     post.content=newc
            //     console.log(post)
            //     // res.send("fjh")
            //     res.redirect("/posts")

            // })

            // app.get("/posts/:id/edit",(req,res)=>{
            //     let{id}=req.params;
            //     let post =data.find((p)=> id === p.id)
            //     res.render("edit.ejs",{post})

            // })

            // app.delete("/posts/:id",(req,res)=>{
            //     let{id}=req.params;
            //     data=data.filter((p)=> id !== p.id)
            //     res.redirect("/posts")
            //     // res.send("skd")
                
            // })
            // app.listen(port,()=>{
            //     console.log("Server is sarted")
            // })




            const express = require('express');
            const app = express();
            const path = require('path');
            const bcrypt = require('bcrypt')
            const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const crypto = require("crypto");
const mongoose = require('mongoose');
// const User = require('./models/User');
require("dotenv").config();

const usermodel = require("./models/user");
const Post = require('./models/post'); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('signup');
           });

app.post("/create",(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
            let usercreate = await usermodel.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
        
                    })
                    let {email, password}= req.body;
                    let token = jwt.sign({email},"dsd");
                    res.cookie("token",token);
                    res.render("login",{usercreate});
                });
            });
        })  


        app.get("/login",(req,res)=>{
            res.render('login')
        })


        app.post("/log",async (req,res)=>{
            let {email , password}=req.body;
            let user = await usermodel.findOne({email});
            if(!user) return res.send("<script>alert('user not found')</script>")
            
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({email:email,userid:user._id},"dsd");
                    res.cookie("token",token);
                    res.redirect("/home")
                }else{
                    res.status(500).send("Password is not correct")
                }   
            })
        })


        app.get("/logout", (req, res) => {
            res.cookie("token", "");
            res.redirect("/login");
          });
        

// app.get('/home',isLoggedin,async (req, res) => {
//     let user = await usermodel.findOne({email:req.user.email})
//     let post = await Post.find()
//     res.render('home',{user,post})
// })
app.get('/home', isLoggedin ,async (req, res) => {
    try {
    let user = await usermodel.findOne({email:req.user.email})

        const posts = await Post.find().populate('userId', 'username'); // Fetch posts
        res.render('home', {user, posts }); // Pass posts to the EJS template
    } catch (error) {
        res.status(500).send('Error fetching posts');
    }
});

app.post('/posts',isLoggedin, async (req, res) => {
    const { title, description, userId } = req.body;
    let user = await usermodel.findOne({email:req.user.email})


    try {

        const newPost = new Post({
            title,
            description,
            userId,
        });

        await newPost.save();
        // res.status(201).json(newPost); // Respond with the created post
        // res.render('home',{user})
        res.redirect('/home')
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle errors
    }
});

app.get('/my-posts', isLoggedin,async (req, res) => {
    try {
        const userEmail = req.user.email;
         // Get the user's email from the request
    let user = await usermodel.findOne({email:req.user.email})

        const posts = await Post.find({ userId:user._id}).populate('userId', 'username'); // Fetch posts for the user based on email
        res.render('my-posts', { posts }); // Render the my-posts EJS template with the user's posts
    } catch (error) {
        res.status(500).send('Error fetching posts');
    }
});

app.get('/posts/:id', isLoggedin, async (req, res) => {
    try{
        const postId = req.params.id;
        let user = await usermodel.findOne({email:req.user.email})
        let post = await Post.findById(postId).populate('userId', 'username');
        res.render('edit',{post});
    }
    catch (error) {
        res.status(404).send('Post not found');
    }
})
// Route to update a specific post
app.post('/update-post/:id',isLoggedin, async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }
        res.redirect('/my-posts'); // Redirect to the user's posts page after updating
    } catch (error) {
        res.status(500).send('Error updating post');
    }
});

app.post('/delete-post/:id', isLoggedin,async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).send('Post not found');
        }
        res.redirect('/my-posts'); // Redirect to the user's posts page after deletion
    } catch (error) {
        res.status(500).send('Error deleting post');
    }
});
function isLoggedin(req, res, next) {
    // protected routes
    if (req.cookies.token === "") {
      // res.send(`<script>alert("Pelse login first");</script>`)
      res.redirect("/login");
    } else {
      let data = jwt.verify(req.cookies.token, "dsd"); // it verify the user
      req.user = data; // it;s useful for geeting data when user logged in
      next();
    }
  }
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})