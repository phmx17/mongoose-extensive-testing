const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', (done) => {
  let joe, blogPost;

  beforeEach((done) => {
    
    joe = new User({ name: 'joe' });
    blogPost = new BlogPost({ title: 'hello', content: 'hi there'})    

    joe.blogPosts.push(blogPost);
    
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done())
  });

  // **code above throws "before all hook in..." error. Even when pasted from Grider's Github. No point in running next test

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        console.log(count);
        done();
      });   
  });
  
});
