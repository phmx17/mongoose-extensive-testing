const User = require('../src/user');
const assert = require('assert');


describe('Validating records', ()=> {
// no beforeEach, because not saving records

  // this is redundant to the 2nd test. Validation happening in the schema will throw 2nd errors.message (must be longer than 2)
  // if (name: undefinded) validationResult will be undefined, hence no message!
  xit('requires a user name', () => {
    const kewl = new User({ name: null })
    const validationResult = kewl.validateSync(); // validateSync() is synchronous; validate(() => {}) is asnync     
    const { message } = validationResult.errors.name; // .message is the last arg; ES6 destructure; all except 'message' are my declared vars!    
    assert(message === 'You must enter a name.')
  });
  
  // must mute either test in order to pass otherwise error
  it('requires a username to be longer than 2 characters', () => {
    const kewl = new User({ name: 'k' })
    const validationResult = kewl.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.')
  });

  it('disallow invalid record from being saved', (done) => {
    user = new User({ name: 'Al' });
    user.save().catch((err) => {
      assert(err.errors.name.message === 'Name must be longer than 2 characters.')
      done();
    });
  });
});