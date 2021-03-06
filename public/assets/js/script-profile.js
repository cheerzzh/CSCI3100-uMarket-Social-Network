jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch('images/2.jpg', {speed: 1000});

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

    
    
});