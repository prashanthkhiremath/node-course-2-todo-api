var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((keys) => {
        process.env[keys] = envConfig[keys]; 
    })
}

// if(env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
// else if (env === 'production') {
//     process.env.MONGODB_URI = 'mongodb://mepraash:12345678@ds161316.mlab.com:61316/todosapp';
//     console.log(process.env.PORT);
// }