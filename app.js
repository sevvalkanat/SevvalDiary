const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Post = require('./models/Post');



const app = express()

//connect db
mongoose.connect('mongodb://localhost/myPost-diary');

//template engine
app.set("view engine","ejs");

//middelewares
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes

app.get('/',async(req,res)=>{
    const posts = await Post.find({})
    res.render('index',{
        posts
    });
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/add_post',(req,res)=>{
    res.render('add_post');
});
app.get('/post',(req,res)=>{
    res.render('post');
});



app.post('/posts',async(req,res)=>{
await Post.create(req.body);//body bilgisini post modeli sayesinde db'de dökümana dönüştürüyoruz
res.redirect('/')
});



const port = 3000;
app.listen(port,()=>
console.log(`sunucu ${port} portunda başlatıldı.. `)
)


