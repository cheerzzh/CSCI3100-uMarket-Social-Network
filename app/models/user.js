// app/models/user.js
// load the things we need

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
  
    userName:String,
    university:String,
    university_mail:String,
    verified:Boolean,
    age:Number,
    birthDate : Date,
    

    admin: Boolean,
    location: String,
    createdDate: Date,
    updatedDate: Date,

    //followingIDList : [String],
    //followerIDList : [String],

    avatarLink : String,
    
    statement : String,

    itemList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    followingList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followerList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    wishList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], // store id of item entries interested,


});


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

