var itemPostTemplate, itemPostSource

jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch('images/3.jpg', {speed: 1000});

    fillUserInfo_Navbar(window.targetUser)
    $("#confirmed-body").hide()

    //console.log(window.targetUser)
    //console.log(window.searchResult)

    var itemSearchResults = {

    	itemEntry :[
    	{
    		imageLink : "http://lorempixel.com/250/140/sports",
    		updateDate : "02/15/2015",
    		updateTime : "12:30",
    		creatorName : "user1",
    		itemName : "item1",
    		description : "xxxx",
    		heartStyle : "color:red;",
    		wishedCount : 3,
    	}
    	]
    }

	itemPostSource = $("#itemSearchResult-template").html();
	itemPostTemplate = Handlebars.compile(itemPostSource);
	itemPostSource1 = $("#itemSearchResult-template1").html();
	itemPostTemplate1 = Handlebars.compile(itemPostSource1);
	itemPostSource2 = $("#itemSearchResult-template2").html();
	itemPostTemplate2 = Handlebars.compile(itemPostSource2);
	itemPostSource3 = $("#itemSearchResult-template3").html();
	itemPostTemplate3 = Handlebars.compile(itemPostSource3);
	//$("#itemSearchResults").html(itemPostTemplate(itemSearchResults));

//	fillItemSearchPanel(itemPostTemplate,window.targetUser.wishList)
//	fillUserSuggestionPanel()
	//$("#itemSearchResults").children()[0]
	//handleItemWithdraw();
	fillItemPanel(window.targetUser.wishList)
	//handleItemWithdraw()
})


function fillconfirmlist(WTBlist){
	


    //console.log(data)
    // create user suggestion array
    var wantUsers = {}
    wantUsers.wanttobuyUser = []
    //$("#userCount").text(window.searchResult.users.length)
    window.searchResult.users.forEach(function(userEntry){

      var wantUserEntry = {}
      wantUserEntry.avatar = userEntry.avatarLink
      wantUserEntry.name = userEntry.userName
      wantUserEntry.userID = userEntry._id
      wantUserEntry.university = '@' +userEntry.university
      wantUserEntry.followButtonID = "followButton_" + userEntry._id
      wantUserEntry.unfollowButtonID = "unfollowButton_" + userEntry._id
      wantUserEntry.userSuggestionID = "userSuggestionID_" + userEntry._id
      wantUserEntry.userLink = "/user/" + userEntry._id
      //console.log(include(window.targetUser.followingList, userEntry._id))
      wantUsers.wanttobuyUser.push(wantUserEntry)
    })
    //console.log(userSuggestion)
    source1 = $("#wantToBuylist-template").html();
    template1 = Handlebars.compile(source1);
    $("#wanttobuyUser").html(template1(userSuggestion));

    // loop through all follow-related button
    $(".followButton").each(function(){
    	if(include(window.targetUser.followingList, $(this).attr('value'))){
    		$(this).hide()
    	}
    	
    })

    $(".unfollowButton").each(function(){
    	if(!include(window.targetUser.followingList, $(this).attr('value'))){
    		$(this).hide()
    	}
    })

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
		     $("#userSuggestionID_" + targetUserID).remove()

		},
		error: function(xhr) {
		    //Do Something to handle error
		}
		});
	})


		
}

function handleItemWithdraw(){
	$('.withrawbtn').click(function(){
		var targetItemID = $(this).attr('value');
		var Itemstatus = $(this).attr('id');
		console.log("successfully click withdraw");
		console.log(targetItemID);
		console.log(Itemstatus);
		var statusID=String(Itemstatus) +'id'+targetItemID;
		$('.itembody'+statusID).remove();
		$.ajax({
			url :'/withDrawItem',
			data : {"itemID" : targetItemID},
			success : function(){
				console.log('withdraw ' + targetItemID + ' success')
				var statusID=String(Itemstatus) +'id'+targetItemID;
				$('.itembody'+statusID).remove();
				
			},
			error: function(){
				console.log('withdraw failed')
				
			}
		});
	});	
}

function fillItemPanel(currentWishList){
    $.get('getMyItem',function(data){
        console.log(data)
        descriptionLimit = 180
        /*
        var itemPosts = {}
        itemPosts.itemEntry = []*/
        var itemPosts = []
        itemPosts[0]={}
        itemPosts[1]={}
        itemPosts[2]={}
        itemPosts[3]={}
        itemPosts[0].itemEntry = []
        itemPosts[1].itemEntry = []
        itemPosts[2].itemEntry = []
        itemPosts[3].itemEntry = []
		data.forEach( function(item, index) {
		    /*
			console.log(element)
			var pr = "<p>price"+element.price+"</p>"
			var descri = "<p>description:" + element.description +"</p>"
			var item = $("<a></a>").attr('href','/updateItem/'+ element._id)
			item.attr('class','list-group-item')
			item.append('<img src="#" alt="" >')
			item.append("<p>"+element.itemName+"</p>")
			item.append(pr)
			item.append(descri)
			var bttns = $("<p></p>")
			bttns.append('<a href="#" class="btn btn-primary" role="button">close</a>')
			bttns.append('<a href="#" class="btn btn-default" role="button">delete</a>')
			item.append(bttns)
			if(element)
			$('.list-group').append(item)*/
			console.log(item)
			
		//console.log(item)
		var index=item.status
		console.log(index)
		var postEntry = {}
		postEntry.avatar = item._creator.avatarLink
		postEntry.creatorName = item._creator.userName
		postEntry.itemName = item.itemName
		postEntry.confirmedbtnId="confirmed"+item._id
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
		postEntry.itemstatus = item.status;
		// depends on whether in list

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
		postEntry.wishedCount = item.wishedList.length
		postEntry.heartID = "heart_" + item._id
		postEntry.itemID = item._id
		postEntry.itemWTBlist = item.wantToBuyUserList
		var itemStatusID=String(item.status) +'id'+item._id
		postEntry.itembodyID = "itembody"+ itemStatusID
		if(item.imageLinks.length > 0)
		{
			postEntry.itemImageLink = item.imageLinks[0]
		}
		else{
			postEntry.itemImageLink = '/images/no-image.png'
		}
		postEntry.price = item.price
		postEntry.condition = item.condition

		var postDate = new Date(item.updateDate)
		postEntry.updateDate = postDate.toISOString().slice(0,10)// adjust time format
		postEntry.updateTime = postDate.toISOString().slice(12,19)
		//console.log(Date(item.updateDate))
		itemPosts[index].itemEntry.push(postEntry)
		}); 
	    $("#itemSearchResults").html(itemPostTemplate(itemPosts[0]));
	    $("#itemSearchResults1").html(itemPostTemplate1(itemPosts[0]));
	    $("#itemSearchResults2").html(itemPostTemplate2(itemPosts[0]));
	    $("#itemSearchResults3").html(itemPostTemplate3(itemPosts[0]));
	    
		$(".confirmedBtn").click(function(){
			console.log('successfully click confirm');
			$("#confirmed-body").show();
			var WTBlist = $(this).attr('value')
			console.log(WTBlist)
			//fillconfirmlist(WTBlist);
		});
		handleItemWithdraw();
	
    //$('.heartButton').click(function(){});
	
    })
    
}

/*
function fillItemSearchPanel(template,currentWishList){

	// use window.searchResult as data
	descriptionLimit = 180
    var itemPosts = {}
    itemPosts.itemEntry = []

    $("#itemCount").text(window.searchResult.items.length)
    $("#searchKey").text(window.searchKey)

    window.searchResult.items.forEach(function(item){
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
		postEntry.heartStyle = "color:red;"
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
            fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList)
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
            fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList)
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

      }


    });

}*/

/*
function fillUserSuggestionPanel(){


    //console.log(data)
    // create user suggestion array
    var userSuggestion = {}
    userSuggestion.suggestions = []
    $("#userCount").text(window.searchResult.users.length)
    window.searchResult.users.forEach(function(userEntry){

      var suggestionEntry = {}
      suggestionEntry.avatar = userEntry.avatarLink
      suggestionEntry.name = userEntry.userName
      suggestionEntry.userID = userEntry._id
      suggestionEntry.university = '@' +userEntry.university
      suggestionEntry.followButtonID = "followButton_" + userEntry._id
      suggestionEntry.unfollowButtonID = "unfollowButton_" + userEntry._id
      suggestionEntry.userSuggestionID = "userSuggestionID_" + userEntry._id
      suggestionEntry.userLink = "/user/" + userEntry._id
      console.log(include(window.targetUser.followingList, userEntry._id))
      userSuggestion.suggestions.push(suggestionEntry)
    })
    //console.log(userSuggestion)
    source = $("#suggestions-template").html();
    template = Handlebars.compile(source);
    $("#suggestions").html(template(userSuggestion));
*/

/*
    // loop through all follow-related button
    $(".followButton").each(function(){
    	if(include(window.targetUser.followingList, $(this).attr('value'))){
    		$(this).hide()
    	}
    	
    })

    $(".unfollowButton").each(function(){
    	if(!include(window.targetUser.followingList, $(this).attr('value'))){
    		$(this).hide()
    	}
    })

    $('.followButton').click(function(){
      var targetUserID = $(this).attr('value')
      console.log(targetUserID)
*/
/*
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
*/
/*
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
		     $("#userSuggestionID_" + targetUserID).remove()

		},
		error: function(xhr) {
		    //Do Something to handle error
		}
		});
	})


}*/


function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}