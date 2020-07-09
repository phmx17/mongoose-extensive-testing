const mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // tell mongoose to substitute any promise with a global one

mongoose.connect('mongodb+srv://SY:mongoboner@cluster0-cd3iq.mongodb.net/<dbname>?retryWrites=true&w=majority', 
{useNewUrlParser: true,
 useUnifiedTopology: true 
});

mongoose.set('useFindAndModify', false); // collections.findAndRemove() without this setting is depracated; another way to set flag; same as above



// wrap this logic in before() which only gets called once for the entire test suite
before((done) => {
  mongoose.connection
      .once('open', ()=> {
        done();
      })
      .on('error', error => {
        console.warn('Warning !!', error)
      });
});


beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  // drop collections so they don't interefere with testing
  users.drop(() => {  
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  }); 

}); // .connection block





