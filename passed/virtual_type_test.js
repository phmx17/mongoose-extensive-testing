const User = require('../src/user');
const assert = require('assert');

describe('virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'whatever'}],
      likes: 0
    });
    joe.save().then(() => {
      User.findOne({ name: 'joe' }).then((user) => {
        assert(user.postCount === 1);
        done();
      });
    });
  });
});