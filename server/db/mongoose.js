var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://mepraash:amma@143@ds161316.mlab.com:61316/todosapp'
  };

  mongoose.connect( process.env.PORT ? db.mlab : db.localhost,{
    useMongoClient: true
  });
// mongoose.connect(db.mlab || db.localhost,{
//     useMongoClient: true
// });

module.exports = {mongoose}; 
