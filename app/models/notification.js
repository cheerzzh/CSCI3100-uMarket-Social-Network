var mongoose = require('mongoose');

// define the schema for our item model
var notificationSchema = mongoose.Schema({

	// notification will be send in the following situation
	// 0: when a user follows you -> jump to profile [ok] *
	// 1: when someone wished your item -> item page [ok] *
	// 2: someone want to buy your item -> item page [ok] *
	// 3: someone accepts your confirmation request ->  item page [ok] 
	// 4. someone rejects your confirmation request -> item management page [ok] *
	// 5. someone send confirmation request to you -> item management page [ok] *
	// 6. someone cancel his confirmaton request on you -> item page [ok] *
	// 7. someone comments your items -> item page [ok] *

	owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createTime : Date,
    hasRead : Boolean, // use to change color in page 
    type:Number,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    item:{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    // front end only cares about this
    title :String,
    content : String,
    link : String,

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Notification', notificationSchema);