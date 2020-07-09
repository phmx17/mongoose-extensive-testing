const assert = require('assert');
const User = require('../src/user.js');


describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({
      name: 'Joe'
    });
    joe.save()
       .then(() => {
          assert(!joe.isNew);   // once instance is saved the flag should have been removed - ie joe is not new anymore
        done()  
      })
    
  });
});
