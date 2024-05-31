const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    title:String,
    diary:String,
    image:String,
    dateCreated:{ type: Date, required: true, default: Date.now },
    
   
});

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;
