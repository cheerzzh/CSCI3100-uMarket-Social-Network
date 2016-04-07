var mongoose = require('mongoose');

// define the schema for our item model
var commentSchema = mongoose.Schema({

    commenter : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createTime : Date,
    content : String,
    referencedItem : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);