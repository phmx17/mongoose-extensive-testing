const assert = require('assert');

const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    blogPost = new BlogPost({ title: 'hello', content: 'hi there'}),
    comment = new Comment({ content: 'congrats on the post' })

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe; // association to joe - that simple 

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
  });

  // it('saves a relation between a user and a blogpost', (done) => {
  //   User.findOne({ name: 'joe' })
  //     .populate('blogPosts')
  //     .then((user) => {
  //       assert(user.blogPosts[0].title === 'hello')
  //       done();
  //     });
  // });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'joe' })
    .populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        // model: 'comment',
        populate: {
          path: 'user',
          // model: 'user'
        }
      }
    })
    .then((user) => {
      assert(user.name === 'joe')
      assert(user.blogPosts[0].title === 'hello')
      assert(user.blogPosts[0].content === 'hi there')
      assert(user.blogPosts[0].comments[0].content === 'congrats on the post')
      assert(user.blogPosts[0].comments[0].user.name === 'joe')
      done();
    })
  })

  // it('saves a full relation graph', (done) => {
  //   User.findOne({ name: 'joe' })
  //     .populate({
  //       path: 'blogPosts',
  //       populate: {
  //         path: 'comments',
  //         model: 'comment',
  //         populate: {
  //           path: 'user',
  //           model: 'user'
  //         }
  //       }
  //     })
  //     .then((user) => {
  //       console.log(user);
  //       assert(user.name === 'Joe');
  //       assert(user.blogPosts[0].title === 'JS is Great');
  //       assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
  //       assert(user.blogPosts[0].comments[0].user.name === 'Joe');

  //       done();
  //     });
  // });





});
