var followerlength,itemPostSource,itemPostTemplate,itemPostTemplate1,itemPostTemplate2,itemPostTemplate3;
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch('images/3.jpg', {speed: 1000});
    console.log(window.user);

    fillUserInfo_Navbar(window.targetUser)
    //fillUserInfo_cover(window.targetUser)
    
    console.log(window.targetUser)
    $('#avatar-profile').attr('src',window.targetUser.avatarLink)
    $('#username-profile').text(window.targetUser.userName)
    $('#email-profile').text("email: " + window.targetUser.local.email)
    $('#university-profile').text("university:" + window.targetUser.university)
    $('#followerNumber').text(window.targetUser.followerList.length)
    $('#followingNumber').text(window.targetUser.followingList.length)
    $('#itemNumber').text(window.targetUser.itemList.length)
    followerlength = window.targetUser.followerList.length;
    //console.log(addAction().html())
    //$.get('/getUserItem',{targetuser : window.targetUser})
    itemPostSource = $("#item-template").html();
	itemPostTemplate = Handlebars.compile(itemPostSource);
	var itemPostSource1 = $("#item-template1").html();
	itemPostTemplate1 = Handlebars.compile(itemPostSource1);
	var itemPostSource2 = $("#item-template2").html();
	itemPostTemplate2 = Handlebars.compile(itemPostSource2);
	var itemPostSource3 = $("#item-template3").html();
	itemPostTemplate3 = Handlebars.compile(itemPostSource3);
	followButton()
    fillItems(window.targetUser,window.user.wishList)
    
    
})

function handleActions(){
    $(".buyButton").click(function(){
        
      var itemID = $(this).attr('value')
      console.log("click buy: " + itemID)

      if(!include(window.user.wantTobuyItemList, itemID)){
        $.ajax({
          type: "POST",
          url: "/wantToBuy",
          data: {itemID:itemID,message:"I want to buy your item"},
          success: function(data) {
              //Do Something
            console.log("add to shopping cart succeed")
           // window.targetUser = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          
            window.user = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItems(window.targetUser,window.user.wishList)
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
            //window.targetUser = data.targetUser

            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
            window.user = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItems(window.targetUser,window.user.wishList)
              
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });
        

      }
    
    })
    
    $(".heartButton").click((function(){
      var itemID = $(this).attr('value')
      console.log("click heart: " + itemID)

      if(!include(window.user.wishList, itemID)){
        $.ajax({
          url: "/addToWishList",
          data: {"itemID":itemID},
          success: function(data) {
              //Do Something
            console.log("add to wishlist succeed")
            window.user = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItems(window.targetUser,window.user.wishList)
          	
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
            window.user = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItems(window.targetUser,window.user.wishList)
          	
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

      }
    }))

}

function followButton(){
    if(include(window.user.followingList,window.targetUser._id)){
	    $('.followButton').hide()
	}
	else{
	    $('.unfollowButton').hide()
	}
	
	$('.followButton').click(function(){
      var targetUserID = window.targetUser._id
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
            //$("#followButton_"+targetUserID).remove()
            $('.followButton').hide()
            $('.unfollowButton').show()
            followerlength += 1
            $('#followerNumber').text(followerlength)
            
        },
        error: function(xhr) {
            //Do Something to handle error
        }
      });

    });

	$('.unfollowButton').click(function(){
		var targetUserID = window.targetUser._id
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
		    //$("#unfollowButton_"+targetUserID).remove()
		    // delete entry
		     //$("#userSuggestionID_" + targetUserID).remove()
		     $('.followButton').show()
            $('.unfollowButton').hide()
            followerlength -= 1
            $('#followerNumber').text(followerlength)
		},
		error: function(xhr) {
		    //Do Something to handle error
		}
		});
	})
}

              
function addAction(){
    var actions=$('<div></div>')
    actions.attr('class','actions')
    var btn1 = '<a href="#"><i class="fa fa-arrow-left"></i></a>'
    var btn2 = '<a href="#"><i class="fa retweet"></i></a>'
    var btn3 = '<a class="heartButton" id = {{heartID}} value={{itemID}}><i class="fa fa-heart" style="{{heartStyle}}" ></i></a>'
    var btnmessg = '<font color="grey">{{wishedCount}} people wished</font>'
    var actionsContent=$('<div></div>')
    actionsContent.append(btn1,btn2,btn3,btnmessg)
    actions.append(actionsContent)
    return actions
}

function fillItems(user,currentWishList){
    var itemPosts=[]
    itemPosts[0]={}
    itemPosts[1]={}
    itemPosts[2]={}
    itemPosts[3]={}
    itemPosts[0].itemEntry = []
    itemPosts[1].itemEntry = []
    itemPosts[2].itemEntry = []
    itemPosts[3].itemEntry = []
         $.ajax({
             url:"/getUserItem",
            data: {"targetUserID":window.targetUser._id},
             success:function(data){
        data.forEach(function(item,index){
            index=item.status
            console.log(index)
            var postEntry={}
            postEntry.itemname=item.itemName
            postEntry.itemStatus=item.condition
            postEntry.itemPrice=item.price
            postEntry.itemLink='/item/' + item._id
            postEntry.userLink = '/user/' + item._creator._id
            postEntry.buyID = "buy_" + item._id
            /*
            if(!include(currentWishList, item._id)){
    		// in wishlist, gray, add to wishlist
    		//postEntry.wishlistLink = '/addToWishList?itemID=' + item._id
    		postEntry.heartStyle = "color:grey;"
    
    		}
    		else
    		{
    		//postEntry.wishlistLink = '/removeFromWishList?itemID=' + item._id
    		postEntry.heartStyle = "color:red;"
    		}
    		*/
        	if(!include(currentWishList, item._id)){
    
    		// in wishlist, gray, add to wishlist
    		//postEntry.wishlistLink = '/addToWishList?itemID=' + item._id
    		postEntry.heartStyle = "color:grey;"
    
    		}
    		else
    		{
    		//postEntry.wishlistLink = '/removeFromWishList?itemID=' + item._id
    		postEntry.heartStyle = "color:red;"
    		}
    		// process buy button
		
    		if(!include(window.user.wantTobuyItemList, item._id)){
    		
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
    		postEntry.itemID = item._id
    		if(item.imageLinks.length > 0)
    		{
    			postEntry.itemImageLink = item.imageLinks[0]
    		}
    		else{
    			postEntry.itemImageLink = '/images/no-image.png'
    		}
    		var postDate = new Date(item.updateDate)
		    postEntry.updateDate = postDate.toISOString().slice(0,10)// adjust time format
		    postEntry.updateTime = postDate.toISOString().slice(12,19)
		    itemPosts[index].itemEntry.push(postEntry)
        })
        $("#item").html(itemPostTemplate(itemPosts[0]));
        $("#item1").html(itemPostTemplate1(itemPosts[1]));
        $("#item2").html(itemPostTemplate2(itemPosts[2]));
        $("#item3").html(itemPostTemplate3(itemPosts[3]));
        handleActions()
        }
        
    })

    
}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}