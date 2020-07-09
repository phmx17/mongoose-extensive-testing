const User = require('../src/user');
const assert = require('assert');
const { findOne } = require('../src/user');



describe('Subdocuments', (done) => {
  it('can create a subdocument', (done) => {
    const joe = new User({ 
      name: 'joe', 
      posts: [{ title: 'what up?' }] });
    
    joe.save().then(() => {
      User.findOne({ name: 'joe'}).then((user) => {
        assert(user.posts[0].title === 'what up?')
        done()
      });
    });    
  });

  it('can add a subdoc to an existing record', (done) => {
    const joe = new User({
      name: 'joe',
      posts: []
    });

    joe.save().then(() => {
      User.findOne({ name: 'joe' }).then((user) => {
        user.posts.push({ title: 'new post' });
        user.save().then(() => {
          User.findOne({ name: 'joe' }).then((user) => {            
            assert(user.posts[0].title === 'new post')
            done();
          });
        });
      });
    });
  });

  it('can remove a subdoc from existing record', (done) => {
    joe = new User({
      name: 'joe',
      posts: [{ title: 'gotcha' }]
    });
    
    joe.save().then(() => {
      User.findOne({ name: 'joe' }).then((user) => {
        user.posts[0].remove();
        user.save().then(() => {
          User.findOne({ name: 'joe' }).then((user) => {
            assert(user.posts.length === 0)
            done();
          });
        });
      });
    });
  });




});