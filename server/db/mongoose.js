var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://mepraash:amma@143@ds149268.mlab.com:49268/todoapp'
  };

mongoose.connect(db.mlab || db.localhost,{
    useMongoClient: true
});

module.exports = {mongoose}; 
