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
		console.log(commentObject)
		var commentEntry = {}
		commentEntry.avatarLink = commentObject.commenter.avatarLink
		commentEntry.userName = commentObject.commenter.userName
		commentEntry.messageContent = commentObject.content
		commentList.commentEntries.push(commentEntry)
	})

	console.log(commentList)
  	$("#commetBox").html(template(commentList));
}

// attach function and style for different item status and user-item relationship
function processButton(userObject,itemObject){

	// normal 
	$("#wishedCount").text(itemObject.wishedList.length)
	$('#addToWishlistButton').unbind() // to avoid multiple bind
	$("#wantToBuyButton").unbind()


	// check whether user is itemOwner
	if(userObject._id == itemObject._creator._id){
		console.log('This is my own item')

		// remove comment form here

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
	}

}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}