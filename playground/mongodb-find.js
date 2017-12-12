//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Todos', (err, client) => {
    if (err) {
       return console.log('Unable to connect to MongoDB server');
    }
    const db = client.db('Todos')
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a2ebdf1fca7c78c26189667'),
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // }) 
    
    // db.collection('Todos').find().count().then((count)=>{
    //     console.log('Todos');
    //     console.log(`Todos count: ${count}`);
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // }) 

    db.collection('Users').find({name:"Prashanth"}).count().then((count)=>{
        console.log('Users')
        console.log(`Users count: ${count}`);
    },(err) => {
        console.log('Unable to fetch users',err);
    })
    //client.close();
});