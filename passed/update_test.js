const User = require('../src/user');
const assert = require('assert');

describe('updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'joe',
      postCount: 0,
      likes: 0
    })
    joe.save().then(() => {
      done();
    });

  });

  const assertName = (promise, done) => {
    promise.then(() => {
      User.find({}).then((users) => {        
        assert(users.length === 1);
        assert(users[0].name === 'josie')
        done();
      });
    });
  }

  // tip: set and save can happen in stages for various properties and then collectively saved 
  it('model instance set and save', (done) => {
    joe.set('name', 'josie');
    assertName(joe.save(), done)    
  });

  it('model instance can update', (done) => {
    joe.updateOne({ name: 'josie'}, (err) => {}); //WTF ??? When there is no callback the name won't update!!!
    assertName(joe.save(), done)
  });

  // find instances via {} and change its properties 
  it('a model class can update', (done) => {
    assertName(
      User.updateOne({ name: 'joe' }, {name: 'josie' }),
      done
    );    
  });

  // find just one instance and update it
  it('a model class can update one record', (done) => {
    assertName (
      User.findOneAndUpdate({ name: 'joe' }, { name: 'josie' }), 
      done
    );
  });

  it('a model class can find via ID and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'josie' }),
      done
    );
  });
  // Update Operator; use class method to update many records in DB without loading into server
  // **** this test will only run when virtual_type_test is out of the way
  it('all users have postcount incremented by 1', (done) => {
    User.updateOne({ name: 'joe' }, { $inc: { likes: 1 }})
    .then(() => User.findOne({ name: 'joe' }))  // necessary as mongoose does not know automatically if joe was updated    
    .then((users) => assert(users.likes === 1))
    
    done() 
  });
});