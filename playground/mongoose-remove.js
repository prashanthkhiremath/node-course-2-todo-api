const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {Users} = require('./../server/models/users');

// Todo.remove({}).then((result)=> {
//     console.log(result);
// })

//Todo.findOneAndRemove
//Todo.findByIdAndRemove
Todo.findOneAndRemove('5a3b4b7b6d91c47f52c99a9f').then((todo) => {
    console.log(todo);
})