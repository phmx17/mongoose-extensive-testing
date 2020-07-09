const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema ({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'  // pointing to a collection; all collections are lower cased by Mongo
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
