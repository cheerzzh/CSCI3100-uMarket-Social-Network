var followerListSource, followerListTemplate
var followingListSource, followingListTemplate

jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch('images/3.jpg', {speed: 1000});

    fillUserInfo_Navbar(targetUser)
	//fillUserInfo_cover(targetUser)
	console.log(targetUser)
	$("#avatar-profile").attr("src",targetUser.avatarLink);
	$("#username-profile").text(targetUser.userName);
	$("#email-profile").text(targetUser.local.email);
	$("#description-profile").html('<strong>Statement: </strong>' + targetUser.statement);
	$("#university-profile").html('<strong>university: </strong>' + targetUser.university);
	$("#followerNumber").text(targetUser.followerList.length);	
	$("#followingNumber").text(targetUser.followingList.length);	
	$("#itemNumber").text(targetUser.itemList.length);	


	// for handlebar template


	followingListSource = $("#followingUser-template").html();
	followingListTemplate = Handlebars.compile(followingListSource);

	followerListSource = $("#followerUser-template").html();
	followerListTemplate = Handlebars.compile(followerListSource);
    /*
	for notification
    */


	fillFollwerList(followerListTemplate)
	fillFollwingList(followingListTemplate)

	$('#new-micropost textarea').autosize();

	var notifications = {
	notifications: [
	{ 
	  title: 'New Post',
	  post: '<span class="mention">@rails_freak</span> shared a new micropost<br>' +
	  'Ruby on Rails is Awesome! <span class="link">p.co/RoRawsme</span>' +
	  '<span class="hashtags">#Rails</span>'
	},
	{
	  title: '@Mention',
	  post: '<span class="mention">@rails_freak</span> mentioned you in a micropost'
	},
	{
	  title: 'Trends',
	  post: '<span class="hashtags">#Rails</span> - Topic you are following is trending!'
	},
	{
	  title: 'Followers',
	  post: 'Yay! <span class="mention">@rails_freak</span> and '+
	  '<span class="mention">@Dev</span>' +
	  'followed you'
	}
	]
	};

	source = $("#notifications-template").html();
	template = Handlebars.compile(source);
	$("#notifications").html(template(notifications));

	var messages = {
	messages: [
	{
	  user: '@rails_freak',
	  message: 'Hey! Checkout my new post. Thanks! <span class="link">p.co/RoRawsme</span>'
	},
	{
	  user: '@blogaholic',
	  message: 'Hey man! Wassup?'
	},
	{
	  user: '@uiux_',
	  message: 'Medium\'s UI is f***ing awesome'
	},
	{
	  user: '@Dev',
	  message: 'What\'s your view on Websockets? Let me know'
	}
	]
	};

	source = $("#messages-template").html();
	template = Handlebars.compile(source); 
	$("#messages").html(template(messages));

	// ajax get user item list and attach 
	$.get( '/getMyItem',1, function(data) { 
		//console.log(data)
		//$('#userInfo').html(data.local.email); 

		data.forEach( function(element, index) {
			//console.log(element)
			$('#userItemList').append('<li><a href='+'/updateItem/'+ element._id+'>'+element.itemName+'</a></li>')
		});
	});
    
    
});


function fillFollwerList(template){

	$.ajax({
        url: "/getDetailFollowerList",
        success: function(data) {
            //Do Something

            
            followerList = data.followerList
            console.log(followerList)

            
            // attach to panel
            var followerUsers = {}
		    followerUsers.followerUser = []

		    followerList.forEach(function(userEntry){

		      var suggestionEntry = {}
		      suggestionEntry.avatar = userEntry.avatarLink
		      suggestionEntry.name = userEntry.userName
		      suggestionEntry.userID = userEntry._id
		      suggestionEntry.university = '@' +userEntry.university
		      suggestionEntry.followButtonID = "followButton_" + userEntry._id
		      suggestionEntry.followingUserID = "followerUserID_" + userEntry._id
		      suggestionEntry.userLink = "/user/" + userEntry._id
		      followerUsers.followerUser.push(suggestionEntry)
		    })
		    //console.log(followerUsers)
		   
		    $("#followerUser").html(template(followerUsers));

		    // attach unfollow button
		    $('.followButton').click(function(){
				var targetUserID = $(this).attr('value')
				console.log(targetUserID)

				// ajax get request
				// request to follow user
				$.ajax({
				url: "/toFollowUser",
				data: {"targetUserID":targetUserID},
				success: function(response) {
				    //Do Something
				    console.log('unFollow' + targetUserID + " success!")

				    // remove button
				    $("#followButton_"+targetUserID).remove()
				    // delete entry
				    //$("#followerUserID_" + targetUserID).remove()
				    //fillFollwerList(followerListTemplate)
					fillFollwingList(followingListTemplate)


				},
				error: function(xhr) {
				    //Do Something to handle error
				}
				});

    		});

    		// remove following button
    		followerList.forEach(function(userEntry){
    			//console.log(include(targetUser.followingList, userEntry._id))

    			// if followr is in my following list, remove follow button
    			if(include(targetUser.followingList, userEntry._id)){
    				console.log('remove ' +"#followButton_"+userEntry._id )
    				$("#followButton_"+userEntry._id).remove()
    			}
    		})
    		

    },
        error: function(xhr) {
            //Do Something to handle error
        }
    });
}

function fillFollwingList(template){

	$.ajax({
        url: "/getDetailFollowingList",
        success: function(data) {
            //Do Something
            followingList = data.followingList
            console.log(followingList)

            // attach to panel
            var followingUsers = {}
		    followingUsers.followingUser = []

		    followingList.forEach(function(userEntry){

		      var suggestionEntry = {}
		      suggestionEntry.avatar = userEntry.avatarLink
		      suggestionEntry.name = userEntry.userName
		      suggestionEntry.userID = userEntry._id
		      suggestionEntry.university = '@' +userEntry.university
		      suggestionEntry.unfollowButtonID = "unfollowButton_" + userEntry._id
		      suggestionEntry.followingUserID = "followingUserID_" + userEntry._id
		      suggestionEntry.userLink = "/user/" + userEntry._id
		      followingUsers.followingUser.push(suggestionEntry)
		    })
		    //console.log(followingUsers)
		    
		    $("#followingUser").html(template(followingUsers));

		    // attach unfollow button
		    $('.unfollowButton').click(function(){
				var targetUserID = $(this).attr('value')
				console.log(targetUserID)

				// ajax get request
				// request to follow user
				$.ajax({
				url: "/toUnFollowUser",
				data: {"targetUserID":targetUserID},
				success: function(response) {
				    //Do Something
				    console.log('unFollow' + targetUserID + " success!")

				    // remove button
				    $("#unfollowButton_"+targetUserID).remove()
				    // delete entry
				    $("#followingUserID_" + targetUserID).remove()

				    // update list
					//fillFollwerList(followerListTemplate)
					//fillFollwingList(followingListTemplate)

				},
				error: function(xhr) {
				    //Do Something to handle error
				}
			});

    	});

    },
        error: function(xhr) {
            //Do Something to handle error
        }
    });
}


function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}


