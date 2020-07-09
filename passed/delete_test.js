const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'joe'
    });
    joe.save().then(() => {
      done();
    });    
  });

  it('model instance remove', (done) => {  // i love this one; give joe an ejector seat: "... und thschüss mofo! "
    joe.remove().then(() => {  
      User.findOne({
        name: 'joe'
      }).then((found) => {
        assert(found === null)
      });
      done();
    });     
  });

  // remove multiple records
  it('class instance remove', (done) => {
    User.deleteMany({ name: 'joe' }).then(() => {  // collection.remove is depracated
      User.findOne({
        name: 'joe'
      }).then((found) => {
        assert(found === null)
      });
      done();
    });     
  });

  // first that matches criteria
  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove ({
      name: 'joe'
    }).then((found) => {
      assert(found === null)
    });
    done();
  });     
  

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id).then((found) => {
      assert(found === null)
    });
    done();
  });
});