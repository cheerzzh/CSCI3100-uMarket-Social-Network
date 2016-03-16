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



});


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