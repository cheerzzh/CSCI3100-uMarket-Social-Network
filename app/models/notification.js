var mongoose = require('mongoose');

// define the schema for our item model
var notificationSchema = mongoose.Schema({

	// notification will be send in the following situation
	// 0: when a user follows you -> jump to profile
	// 1: when someone wished your item -> item page
	// 2: someone want to buy your item -> item page
	// 3: someone accepts your confirmation request ->  item page
	// 4. someone rejects your confirmation request -> item management page
	// 5. someone send confirmation request to you -> item management page
	// 6. someone cancel his confirmaton request on you -> item page
	// 7. someone comments your items -> item page

	owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createTime : Date,
    hasRead : Boolean, // use to change color in page 
    type:Number,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    item:{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' },

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Notification', notificationSchema);