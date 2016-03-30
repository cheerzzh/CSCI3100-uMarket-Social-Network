// app/models/.js
// load the things we need

var mongoose = require('mongoose');
var random = require('mongoose-random');

// define the schema for our item model
var itemSchema = mongoose.Schema({

    userID : String,
    userEmail : String,
    itemName : String,
    createDate : Date,
    updateDate : Date,
    imageLinks : [String],
    buy : Boolean,
    free : Boolean,
    price : Number,
    description : String,
    condition : Number,
    refLink : String,
    waitingList : [String], // store id of users who what to buy
    status : Number, // 0: in progess 1: wait for confirm  2: confirmed 3: withdrawed
    confirmedCounterParty : String, // id of counterParty

    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    wishedList : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], 




});
itemSchema.plugin(random, { path: 'r' }); 

// methods ======================
// generating a hash
itemSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
itemSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

itemSchema.methods.attachImageLink = function(imageID){

    this.imageLinks.push(imageID);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);