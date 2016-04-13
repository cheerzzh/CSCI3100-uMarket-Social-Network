var timelinePostSource, timelinePostTemplate
var itemPostTemplate, itemPostSource
var messagePanelSource, messagePanelTemplate
var notificationNavSource, notificationNavTemplate

$(document).ready(function(){


  //timelinePostSource = $("#microposts-template").html();
  //timelinePostTemplate = Handlebars.compile(timelinePostSource);

  itemPostSource = $("#itemSearchResult-template").html();
  itemPostTemplate = Handlebars.compile(itemPostSource);

  var source, template;

  //$.backstretch('../assets/images/background-4.jpg', {speed: 1000});
  $.backstretch('images/3.jpg', {speed: 1000});
  $('.cover-pic').backstretch([
    'images/img-1.jpg',
    'images/img-2.jpg',
    'images/img-3.jpg',
    'images/img-4.jpg',
    ], {duration: 2500, fade: 1500});

  fillUserInfo_Navbar(window.targetUser)
  fillUserInfo_cover(window.targetUser)

  $('#new-micropost textarea').autosize();

  // fetch notification
  
  notificationNavSource = $("#notifications-template").html();
  notificationNavTemplate = Handlebars.compile(notificationNavSource);
  //$("#notifications").html(notificationNavTemplate(notifications));

 

  messagePanelSource = $("#messages-template").html();
  messagePanelTemplate = Handlebars.compile(messagePanelSource);


  fillUserSuggestionPanel()
  //fillTimeLinePanel(timelinePostTemplate,window.targetUser.wishList)
  fillItemSearchPanel(itemPostTemplate,window.targetUser.wishList,window.targetUser.wantTobuyItemList)
  fillMessagePanel()


  // get notification
  fillNotificationNavBar(notificationNavTemplate)




});

function fillNotificationNavBar(template){
  $.ajax({
    type: "POST",
    url: "/getAllNotification",
    success: function(data) {
      //console.log(data)
      var notificationList = {}
      notificationList.notifications = []
      var newNotificationCount = 0
      data.forEach(function(entry){
        temp = {}
        temp.link = entry.link
        temp.title = entry.title
        temp.content = entry.content
        temp.notification_id = entry._id

        if(!entry.hasRead){
          temp.backgroundStyle = "background-color:#ECF5FF";
          //temp.style1 = "<i class='fa fa-circle' style='color:red;'></i>"
          newNotificationCount ++
        }else{
          temp.backgroundStyle = "";
        }
        notificationList.notifications.push(temp)
      })
      $("#notifications").html(template(notificationList));
      if(newNotificationCount > 0){
        //$("#notification_title").text(newNotificationCount + " New Notifications")
        $("#notification_icon").css("color","#dd4b39")
      }
      else{
        $("#notification_icon").css("color","")
      }
      

      // attach function to label readed
      $(".notification_post").click(function(){
        var notificationID =  $(this).attr('value')
        //console.log(notificationID)
         $.ajax({
          type:"post",
          url: "/readNotification",
          data: {"notificationID":notificationID},
          success: function(data) {
            //console.log(data)
            fillNotificationNavBar(notificationNavTemplate)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

      })
    },
    error: function(xhr) {
        //Do Something to handle error
    }
  });
}

function fillMessagePanel(){

  // get messages
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

    $("#messages").html(messagePanelTemplate(messages));

}

function fillItemSearchPanel(template,currentWishList,currentWantTobuyItemList){



  $.get('/getTimelinePost',1, function(data) {
    // use window.searchResult as data
    descriptionLimit = 180
    var itemPosts = {}
    itemPosts.itemEntry = []

    data.forEach(function(item){
    //console.log(item)
    var postEntry = {}
    postEntry.avatar = item._creator.avatarLink
    postEntry.creatorName = item._creator.userName
    postEntry.itemName = item.itemName
    if(item.description.length > descriptionLimit)
    {
    postEntry.description = item.description.substr(1, descriptionLimit) + " ...";
    }
    else
    {
    postEntry.description = item.description
    }

    postEntry.userLink = '/user/' + item._creator._id
    postEntry.itemLink = '/item/' + item._id
    // depends on whether in list

    if(!include(currentWishList, item._id)){

    // in wishlist, gray, add to wishlist
    //postEntry.wishlistLink = '/addToWishList?itemID=' + item._id
    postEntry.heartStyle = "color:grey;"
  

    }
    else
    {
    //postEntry.wishlistLink = '/removeFromWishList?itemID=' + item._id
    postEntry.heartStyle = "color:#ff4444;"

    }

    // process buy button
    if(!include(currentWantTobuyItemList, item._id)){

    // in wishlist, gray, add to wishlist
    //postEntry.wishlistLink = '/addToWishList?itemID=' + item._id
    postEntry.buyStyle = "color:grey;"
    postEntry.buyDesciption ="Buy"

    }
    else
    {
    //postEntry.wishlistLink = '/removeFromWishList?itemID=' + item._id
    postEntry.buyStyle = "color:#ffa85a;"
    postEntry.buyDesciption ="Sent"
    }

    postEntry.wishedCount = item.wishedList.length
    postEntry.heartID = "heart_" + item._id
     postEntry.buyID = "buy_" + item._id
    postEntry.itemID = item._id
    if(item.imageLinks.length > 0)
    {
      postEntry.itemImageLink = item.imageLinks[0]
    }
    else{
      postEntry.itemImageLink = '/images/no_image_1.png'
    }
    postEntry.price = item.price
    postEntry.condition = item.condition

    var postDate = new Date(item.updateDate)
    postEntry.updateDate = postDate.toISOString().slice(0,10)// adjust time format
    postEntry.updateTime = postDate.toISOString().slice(12,19)
    //console.log(Date(item.updateDate))
    itemPosts.itemEntry.push(postEntry)
    })

    //console.log(itemPosts)
    $("#itemSearchResults").html(itemPostTemplate(itemPosts));

    $('.heartButton').click(function(){
      var itemID = $(this).attr('value')
      console.log("click heart: " + itemID)

      if(!include(currentWishList, itemID)){
        $.ajax({
          url: "/addToWishList",
          data: {"itemID":itemID},
          success: function(data) {
              //Do Something
            console.log("add to wishlist succeed")
            window.targetUser = data.targetUser

            // refresh whole timeline?
            fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });
      }else{

        $.ajax({
          url: "/removeFromWishList",
          data: {"itemID":itemID},
          success: function(data) {
              //Do Something
            console.log("remove from wishlist succeed")
            window.targetUser = data.targetUser

            // refresh whole timeline?
            fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

      }
    });

    // attach what to buy button
    
    $('.buyButton').click(function(){
      var itemID = $(this).attr('value')
      console.log("click buy: " + itemID)

      if(!include(currentWantTobuyItemList, itemID)){
        $.ajax({
          type: "POST",
          url: "/wantToBuy",
          data: {itemID:itemID,message:"I want to buy your item"},
          success: function(data) {
              //Do Something
            console.log("add to shopping cart succeed")
            window.targetUser = data.targetUser

            // refresh whole timeline?
            fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });
      }else{

        
        $.ajax({
          type:"post",
          url: "/toCancelWantToBuy",
          data: {"itemID":itemID},
          success: function(data) {
            console.log(data)
              //Do Something
            console.log("remove from wantToBuy succeed")
            window.targetUser = data.targetUser

            fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });
        

      }
    });
    

  })
}


// not used
function fillTimeLinePanel(template,currentWishList){
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
      // depends on whether in list
      
      if(!include(currentWishList, itemEntry._id)){

        // in wishlist, gray, add to wishlist
        //postEntry.wishlistLink = '/addToWishList?itemID=' + itemEntry._id
        postEntry.heartStyle = "color:grey;"

      }
      else
      {
        //postEntry.wishlistLink = '/removeFromWishList?itemID=' + itemEntry._id
        postEntry.heartStyle = "color:red;"
      }
      postEntry.wishedCount = itemEntry.wishedList.length
      postEntry.heartID = "heart_" + itemEntry._id
      postEntry.itemID = itemEntry._id
      if(itemEntry.imageLinks.length > 0)
      {
        postEntry.itemImageLink = itemEntry.imageLinks[0]
      }
      var postDate = new Date(itemEntry.updateDate)
      postEntry.time = postDate.toISOString().slice(0,10) + " " + postDate.toISOString().slice(12,19)// adjust time format
      //console.log(Date(itemEntry.updateDate))
      itemPosts.microposts.push(postEntry)
    })

    $("#microposts").html(template(itemPosts));

    //paginate()
    // attach heart function
    $('.heartButton').click(function(){
      var itemID = $(this).attr('value')
      console.log("click heart: " + itemID)

      if(!include(currentWishList, itemID)){
        $.ajax({
          url: "/addToWishList",
          data: {"itemID":itemID},
          success: function(data) {
              //Do Something
            console.log("add to wishlist succeed")
            window.targetUser = data.targetUser

            // refresh whole timeline?
            fillTimeLinePanel(timelinePostTemplate,data.targetUser.wishList)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });
      }else{

        $.ajax({
          url: "/removeFromWishList",
          data: {"itemID":itemID},
          success: function(data) {
              //Do Something
            console.log("remove from wishlist succeed")
            window.targetUser = data.targetUser

            // refresh whole timeline?
            fillTimeLinePanel(timelinePostTemplate,data.targetUser.wishList)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

      }


    });
  

  })
}

function fillUserSuggestionPanel(){

  $.get('/getUserSuggestion',1, function(data) {
    //console.log(data)
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


function paginate(){
    $('#microposts').each(function() {
    var currentPage = 0;
    var numPerPage = 3;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('micropost').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('micropost').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
      $pager.insertBefore($table).find('span.page-number:first').addClass('active');
  });
}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}





