const Post = require('../models/Post')
const fs = require('fs');

exports.getAllPosts = async(req,res)=>{
    const posts = await Post.find({}).sort('-dateCreated');
    res.render('index',{
        posts
    });
};

exports.getPost = async(req,res)=>{ 
    //console.log(req.params.id);
    const post = await Post.findById(req.params.id)
    res.render('post',{
        post //post bilgisi id'si yardımıyla bulduğumuz fotoğraf
    })
   };

   exports.createPost = async(req,res)=>{
    //console.log(req.files.image)
    //await Post.create(req.body);//body bilgisini post modeli sayesinde db'de dökümana dönüştürüyoruz
    //res.redirect('/')
    
    const uploadDir = 'public/uploads';
    
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
    
    uploadImage.mv(uploadPath, async() =>{
        await Post.create({
            ...req.body,
            image:'/uploads/'+uploadImage.name,
        });
        res.redirect('/')
    })
    
    }

exports.updatePost= async(req,res)=>{
    const post = await Post.findOne({ _id: req.params.id });
    post.title=req.body.title
    post.diary=req.body.diary
    post.save();
    res.redirect(`/posts/${req.params.id}`
    
    )};

    exports.deletePost = async(req,res)=>{
        const post =await Post.findOne({_id: req.params.id}); 
        let deletedImage = __dirname + '/public' + post.image;
        fs.unlinkSync(deletedImage);
       await Post.findByIdAndDelete(req.params.id);
       res.redirect('/');
    };

    