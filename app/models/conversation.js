var mongoose = require('mongoose');

// define the schema for our item model
var conversationListSchema = mongoose.Schema({

	party1 : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	party2 : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messageList : [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    referencedItem : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }, // optional field: related item entry for this conversation
    updateTime : Date,
    hasNewMessage1 : Boolean,
    hasNewMessage2 : Boolean,

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Conversation', conversationListSchema);