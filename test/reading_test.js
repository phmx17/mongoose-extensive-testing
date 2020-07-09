const assert = require ('assert');
const User = require('../src/user');
const { doesNotMatch } = require('assert');

describe('reading user out of the database', () =>{
  let joe   // keep unborn joe free to use inside this scope

  beforeEach((done) => {
    alex = new User({ name: 'alex' });
    joe = new User({ name: 'joe' });
    maria = new User({ name: 'maria' });
    zach = new User({ name: 'zach' });    
    Promise.all([alex.save(), maria.save(), zach.save(), joe.save()])
    .then(() => done())
  });

 
  // it('find all users by the name of joe', (done) => {
  //   User.find({
  //     name: 'joe'
  //   })
  //   .then((users) => {
  //     assert(users[0]._id.toString() === joe._id.toString())
  //   })
  //   done()

  // }); // it block

  // it('will find a user with a specific _id', (done) => {
  //   User.findById({
  //     _id: joe._id
  //   })
  //   .then((user) => {
  //     assert(user.name === 'joe')      
  //   })
  //   done()
  // });

  it('can skip and limit the result set', (done) => {
    // skip Alex, show [joe, maria], no zach
     User.find({})
     .sort({ name: 1 }) // 1 = ascending; -1 = descending
     .skip(1)
     .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'joe');
        assert(users[1].name === 'maria')
        done();
      });
  });


}); // describe block