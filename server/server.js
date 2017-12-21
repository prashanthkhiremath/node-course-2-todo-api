const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {Users} = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todos = new Todo({
        text: req.body.text
    });

    todos.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res) => {
    Todo.find().then((todos)=> {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// //Dynamic routing
// app.get('/todos/:id',(req,res) => {
//     var id = req.params.id;

//     if(!ObjectID.isValid(id)){
//         return res.status(404).send()
//     }

//     Todo.findById({_id:id}).then((todo)=>{
//         if(!todo){
//            return res.status(404).send();
//         }
//         res.send({todo});
//     }).catch((e) => {
//         res.status(400).send();
//     })
// })

app.delete('/todos/:id',(req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((result) => {
        if(!result) {
            return res.status(404);
        }
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send();
    })    
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
