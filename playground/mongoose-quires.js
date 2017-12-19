const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {Users} = require('./../server/models/users');

// var id = '5a31330b3726bd18e437292c';

// Todo.find({
//     _id:id
// }).then((todos) => {
//     console.log('Todos',todos)
// });

// Todo.findOne({
//     _id:id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById({
//     _id:id
// }).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo);
// }).catch((e)=>console.log(e));


//challange

Users.findById('5a31330b3726bd18e437292c').then((user)=>{
    if(!user) {
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user,undefined,2));
}).catch((e)=>{
    console.log(e)
});
