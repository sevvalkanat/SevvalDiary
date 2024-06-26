const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');
require('dotenv').config()

const app = express()

//connect db
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`);

//template engine
app.set("view engine","ejs");

//middelewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

//routes
app.get('/about',pageController.getAboutPage);

app.get('/add_post',pageController.getAddPage);

app.get('/post',pageController.getPostPage);

app.get('/posts/edit/:id',pageController.getEditPage);

app.get('/',postController.getAllPosts);

app.get('/posts/:id',postController.getPost);

app.post('/posts',postController.createPost );

app.put('/posts/:id',postController.updatePost);

app.delete('/posts/:id',postController.deletePost);



const port = 3000;
app.listen(port,()=>
console.log(`sunucu ${port} portunda başlatıldı.. `)
)


