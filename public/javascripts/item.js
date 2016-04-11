var commentBoxTemplate, commentBoxSource

$(document).ready(function(){

	$.backstretch('images/3.jpg', {speed: 1000});
  	$('.cover-pic').backstretch([
    'images/img-1.jpg',
    'images/img-2.jpg',
    'images/img-3.jpg',
    'images/img-4.jpg',
    ], {duration: 2500, fade: 1500});

  	fillUserInfo_Navbar(window.targetUser)
  	fillUserInfo_cover(window.targetItem._creator)


  	commentBoxSource = $("#commentBox-template").html();
 	commentBoxTemplate = Handlebars.compile(commentBoxSource);
 	
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

  	// fillin item info
  	$("#item-description").text(window.targetItem.description)
  	$("#item-name").text(window.targetItem.itemName)
  	$("#item-price").text("$" + window.targetItem.price)
  	
  	$("#item-image_1").attr("src",window.targetItem.imageLinks[0]);

  	$("#seller-avatar").attr("src",window.targetItem._creator.avatarLink);

  	processButton(window.targetUser,window.targetItem)

})

function fillInCommentBox(template,commentListData){

	// fillin handlebar template
  	var commentList = {}
  	commentList.commentEntries = []

	commentListData.forEach(function(commentObject){
		//console.log(commentObject)
		var commentEntry = {}
		commentEntry.avatarLink = commentObject.commenter.avatarLink
		commentEntry.userName = commentObject.commenter.userName
		commentEntry.messageContent = commentObject.content
		commentEntry.postTime = commentObject.createTime.slice(0,10) + " " + commentObject.createTime.slice(12,19)
		commentEntry.commenterLink = '/user/' + commentObject.commenter._id
		commentList.commentEntries.push(commentEntry)
	})

	//console.log(commentList)
  	$("#commetBox").html(template(commentList));
}

// attach function and style for different item status and user-item relationship
function processButton(userObject,itemObject){

	// normal 
	$("#wishedCount").text(itemObject.wishedList.length)
	$('#addToWishlistButton').unbind() // to avoid multiple bind
	$("#wantToBuyButton").unbind()
	$("#message-submit-button").unbind()


	// check whether user is itemOwner
	if(userObject._id == itemObject._creator._id){
		console.log('This is my own item')

		$.ajax({
          type: "POST",
          url: "/getItemComments",
          data: {itemID:itemObject._id},
          success: function(data) {
          	console.log('Item comment list:')
          	//console.log(data)
          	fillInCommentBox(commentBoxTemplate,data)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

	}else {
		
		// check item status
		// item is active
		if(itemObject.status == 0){
			console.log('Item is active')
			$("#wantToBuyButton").show()
			// attach function
			// if in wish list
			if(!include(userObject.wishList, itemObject._id)){
				$("#heartIcon").css('color','grey')
				// attach function
				$('#addToWishlistButton').click(function(){
					//console.log('heart')
					// send ajax request to add to wishlist
					$.ajax({
			          url: "/addToWishList",
			          data: {"itemID":itemObject._id},
			          success: function(data) {
			              //Do Something
			            console.log("add to wishlist succeed")
			            window.targetUser = data.targetUser
			            window.targetItem = data.targetItem
			            processButton(window.targetUser, window.targetItem)
			          },
			          error: function(xhr) {
			              //Do Something to handle error
			          }
			        });
				})
			}else{
				// already liked
				$("#heartIcon").css('color','red')
				$('#addToWishlistButton').click(function(){
				
					// remove from wishlist ajax request
					$.ajax({
			          url: "/removeFromWishList",
			          data: {"itemID":itemObject._id},
			          success: function(data) {
			              //Do Something
			            console.log("remove from wishlist succeed")
			            window.targetUser = data.targetUser
			            window.targetItem = data.targetItem
				        processButton(window.targetUser, window.targetItem)
			          },
			          error: function(xhr) {
			              //Do Something to handle error
			          }
			        });
				})
			}

			// check in want to buy list
			if(!include(userObject.wantTobuyItemList, itemObject._id)){
				$("#buyButtonText").text('Click to Buy')
				// attach buy
				$("#wantToBuyButton").click(function(){
					$.ajax({
			          type: "POST",
			          url: "/wantToBuy",
			          data: {itemID:itemObject._id,message:"I want to buy your item"},
			          success: function(data) {
			              //Do Something
			            console.log("add to shopping cart succeed")
			            window.targetUser = data.targetUser
			            window.targetItem = data.targetItem
				        processButton(window.targetUser, window.targetItem)

			          },
			          error: function(xhr) {
			              //Do Something to handle error
			          }
			        });
				})
			}else{
				$("#buyButtonText").text('Buying Request Sent')
			}
		}else if(itemObject.status == 1){
			console.log('Item is waiting for confirmation')
			$("#itemReservedButton").show()
		}else if(itemObject.status == 2){
			console.log('Item was traded')
			$("#itemTradedButton").show()
		}

		// comment panel process
		// fetch comment 
		$.ajax({
          type: "POST",
          url: "/getItemComments",
          data: {itemID:itemObject._id},
          success: function(data) {
          	console.log('Item comment list:')
          	//console.log(data)
          	fillInCommentBox(commentBoxTemplate,data)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

        // attach comment write function
        $("#add-comment-box").show()
        $("#message-submit-button").click(function(){
        	console.log('click submit message')
        	console.log($("#message-area").val())
        	var commentContent = $("#message-area").val()

        	if(commentContent != ""){
        		//console.log('not empty')
	        $.ajax({
	          type: "POST",
	          url: "/writeComment",
	          data: {itemID:itemObject._id,commentContent:commentContent},
	          success: function(data) {
	          	console.log('Commented')
	          	$("#message-area").val("")
	          	window.targetUser = data.targetUser
	            window.targetItem = data.targetItem
	            processButton(window.targetUser, window.targetItem)
	          	
	          },
	          error: function(xhr) {
	              //Do Something to handle error
	          }
	        });

        	}

        })

	}

}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}