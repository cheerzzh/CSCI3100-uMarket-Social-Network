jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch('images/3.jpg', {speed: 1000});
    console.log(window.user)

    fillUserInfo_Navbar(window.targetUser)
    console.log(window.targetUser)
    $('#avatar-profile').attr('src',window.targetUser.avatarLink)
    $('#username-profile').text(window.targetUser.userName)
    $('#email-profile').text(window.targetUser.local.email)
    $('#university-profile').text(window.targetUser.university)
    $('#followerNumber').text(window.targetUser.followerList.length)
    $('#followingNumber').text(window.targetUser.followingList.length)
    $('#itemNumber').text(window.targetUser.itemList.length)
    //console.log(addAction().html())
    //$.get('/getUserItem',{targetuser : window.targetUser})
    itemPostSource = $("#item-template").html();
	itemPostTemplate = Handlebars.compile(itemPostSource);
	followButton()
    fillItems(window.targetUser,window.targetUser.wishedList)
    
    
})

function followButton(){
    if(include(window.user.followingList,window.targetUser._id)){
	    $('.unfollowButton').hide()
	}
	else{
	    $('.followButton').hide()
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
    var itemPosts={}
    itemPosts.itemEntry=[]
         $.ajax({
             url:"/getUserItem",
            data: {"targetUserID":window.targetUser._id},
             success:function(data){
        data.forEach(function(item,index){
            index=item.status
            console.log(index)
            var postEntry={}
            postEntry.itemname=item.itemName
            postEntry.itemStatus=item.condiction
            postEntry.itemPrice=item.price
            postEntry.itemLink='/item/' + item._id
            postEntry.userLink = '/user/' + item._creator._id
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
    		postEntry.heartStyle = "color:grey;"
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
		    itemPosts.itemEntry.push(postEntry)
        })
        $("#item").html(itemPostTemplate(itemPosts));
        }
        
    })

    
}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}