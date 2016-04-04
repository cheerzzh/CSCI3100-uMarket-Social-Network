var mongoose = require('mongoose');

// define the schema for our item model
var messageSchema = mongoose.Schema({

    sender : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createTime : Date,
    content : String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);