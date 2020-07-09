const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2 ,
      message: 'Name must be longer than 2 characters.'
    }
  },
  
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]

  
});
// required: [true, 'You must enter a name.']

// virtual property; yay! so kewl.....
userSchema.virtual('postCount').get(function() {
  return this.posts.length; // .length is the active ingredient that makes this a dynamic property; my words!
})

// remove middleware including next
userSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // this === joe
  BlogPost.remove({ _id: { $in: this.blogPosts }})
    .then(() => next());
})


const User = mongoose.model('user', userSchema);
module.exports = User;
