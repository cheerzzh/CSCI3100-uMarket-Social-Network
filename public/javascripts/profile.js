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


	// need to query follower and following list and fill in
	$("#followerList").text(targetUser.followerList)
	$("#followingList").text(targetUser.followingList)

    /*
	for notification
    */

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


	$.get( '/getMyItem',1, function(data) { 
		console.log(data)
		//$('#userInfo').html(data.local.email); 

		data.forEach( function(element, index) {
			console.log(element)
			$('#userItemList').append('<li><a href='+'/updateItem/'+ element._id+'>'+element.itemName+'</a></li>')
		});
	});
    
    
});