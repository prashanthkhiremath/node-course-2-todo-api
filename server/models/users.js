const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique:true,
        validate: {
            validator: validator.isEmail,
            message: '(VALUE) is not a valid email'
        },     
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
},{
    usePushEach:true
});

UserSchema.methods.generateAuthToken = function () {
    //this represnts individual document
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

    user.tokens.push({access,token});

    return user.save().then(() => {
        return token;
    })
};

//Model method

UserSchema.statics.findByToken = function(token) {
//model method will be called with model as this
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'abc123')
    } catch (e) {
        // return new Promise((resolve,reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
   
};

UserSchema.pre('save', function (next) {
  var user = this;
  
  if (user.isModified('password')) {
      bcrypt.genSalt(10,(err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next()
          });
      });
  } else {
      next();
  }  
})

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    })
};

var Users = mongoose.model('Users', UserSchema);

module.exports = { Users };