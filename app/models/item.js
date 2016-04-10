// app/models/.js
// load the things we need

var mongoose = require('mongoose');

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
    confirmedCounterParty :  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id of counterParty

    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    wishedList : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    wantToBuyUserList : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], // store users who what to buy

    // comment list
    commentList : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    tagList : [String], // store list of tags from user input

});


// methods ======================
itemSchema.methods.attachImageLink = function(imageID){

    this.imageLinks.push(imageID);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);