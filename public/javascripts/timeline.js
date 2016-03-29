$(document).ready(function(){

  /*
  var user = <%- user %>
  if(user.local.email)
  {
    console.log(user.local.email);
  }
  */
  // use ajx call to get user, notification, message, post, trend .....

  var source, template;

  //$.backstretch('../assets/images/background-4.jpg', {speed: 1000});
  $.backstretch('images/3.jpg', {speed: 1000});
  $('.cover-pic').backstretch([
    'images/img-1.jpg',
    'images/img-2.jpg',
    'images/img-3.jpg',
    'images/img-4.jpg',
    ], {duration: 2500, fade: 1500});

  fillUserInfo_Navbar(targetUser)
  fillUserInfo_cover(targetUser)

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


  var trends = {
    trends: [
    { trend: '#Theme' },
    { trend: '#Bootstrap' },
    { trend: '#Rails' },
    { trend: '#Blog' },
    { trend: '#Javascript' },
    ]
  };

  source = $("#trends-template").html();
  template = Handlebars.compile(source);
  $("#trends").html(template(trends));

  fillUserSuggestionPanel()
  

  $.get('/getTimelinePost',1, function(data) {

    //console.log(data)

    descriptionLimit = 200
    var itemPosts = {}
    itemPosts.microposts = []

    data.forEach(function(itemEntry){

      var postEntry = {}
      postEntry.avatar = itemEntry._creator.avatarLink
      postEntry.name = itemEntry._creator.userName
      postEntry.post = itemEntry.itemName
      if(itemEntry.description.length > descriptionLimit)
      {
        postEntry.description = itemEntry.description.substr(1, 200) + " ...";
      }
      else
      {
        postEntry.description = itemEntry.description
      }

      postEntry.userLink = '/user/' + itemEntry._creator._id
      postEntry.itemLink = '/item/' + itemEntry._id
      if(itemEntry.imageLinks.length > 0)
      {
        postEntry.itemImageLink = itemEntry.imageLinks[0]
      }
      var postDate = new Date(itemEntry.updateDate)
      postEntry.time = postDate.toISOString().slice(0,10) + " " + postDate.toISOString().slice(12,19)// adjust time format
      //console.log(Date(itemEntry.updateDate))
      itemPosts.microposts.push(postEntry)
    })

    source = $("#microposts-template").html();
    template = Handlebars.compile(source);
    $("#microposts").html(template(itemPosts));



  })




});


function fillUserSuggestionPanel(){

  $.get('/getUserSuggestion',1, function(data) {
    console.log(data)
    // create user suggestion array
    var userSuggestion = {}
    userSuggestion.suggestions = []

    data.forEach(function(userEntry){

      var suggestionEntry = {}
      suggestionEntry.avatar = userEntry.avatarLink
      suggestionEntry.name = userEntry.userName
      suggestionEntry.userID = userEntry._id
      suggestionEntry.university = '@' +userEntry.university
      suggestionEntry.followButtonID = "followButton_" + userEntry._id
      suggestionEntry.userSuggestionID = "userSuggestionID_" + userEntry._id
      suggestionEntry.userLink = "/user/" + userEntry._id
      userSuggestion.suggestions.push(suggestionEntry)
    })
    //console.log(userSuggestion)
    source = $("#suggestions-template").html();
    template = Handlebars.compile(source);
    $("#suggestions").html(template(userSuggestion));

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
            console.log('Follow' + targetUserID + " success!")

            // remove button
            $("#followButton_"+targetUserID).remove()
            // delete entry
            $("#userSuggestionID_" + targetUserID).remove()
        },
        error: function(xhr) {
            //Do Something to handle error
        }
      });

    });

  });
}







