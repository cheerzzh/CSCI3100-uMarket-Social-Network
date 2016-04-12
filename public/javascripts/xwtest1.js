var itemPostTemplate, itemPostSource,sourceWTB,templateWTB;

jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch('images/3.jpg', {speed: 1000});
    fillUserInfo_Navbar(window.targetUser)
    $("#confirmed-body").hide()
    console.log(window.targetUser)

    //console.log(window.targetUser)
    //console.log(window.searchResult)
	/*
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
    
    var itemWantUser = {
    	wanttobuyUser :[
    	{
    		wantBodyID : "wanttobuy_" + "1234567",
    		wantUseravatar : "http://lorempixel.com/250/140/sports",
    		wantuserLink : "http://lorempixel.com/250/140/sports",
    		wantusername : "wendy",
    		wantuseruniversity : "jiayou!",
    		wantuseruserID : "12345677",
    	}
    	]
    }
    var singleuser = {
    	wantBodyID : "wanttobuy_" + "1234567",
    	wantUseravatar : "http://lorempixel.com/250/140/sports",
    	wantuserLink : "http://lorempixel.com/250/140/sports",
    	wantusername : "user1",
    	wantuseruniversity : "jiayou!",
    	wantuseruserID : "12345677",
    	
    }
    itemWantUser1 = {}
    itemWantUser1.wanttobuyUser = []
	itemWantUser.wanttobuyUser.push(singleuser)
	itemWantUser1.wanttobuyUser.push(singleuser)
	itemWantUser1.wanttobuyUser.push(singleuser)
	var singleuser1 = {}
	singleuser1.wantBodyID = "wanttobuy_" + "1234567"
	singleuser1.wantUseravatar = "http://lorempixel.com/250/140/sports"
	singleuser1.wantuserLink = "http://lorempixel.com/250/140/sports"
	singleuser1.wantusername = "user2"
	singleuser1.wantuseruniversity = "kaka"
	singleuser1.wantuserID = "456789"
	itemWantUser1.wanttobuyUser.push(singleuser1)
	*/
	itemPostSource = $("#itemSearchResult-template").html();
	//console.log(itemPostSource)
	itemPostTemplate = Handlebars.compile(itemPostSource);
	//console.log(itemPostTemplate)
	itemPostSource1 = $("#itemSearchResult-template1").html();
	itemPostTemplate1 = Handlebars.compile(itemPostSource1);
	itemPostSource2 = $("#itemSearchResult-template2").html();
	itemPostTemplate2 = Handlebars.compile(itemPostSource2);
	itemPostSource3 = $("#itemSearchResult-template3").html();
	itemPostTemplate3 = Handlebars.compile(itemPostSource3);
	itemPostSource5 = $("#itemSearchResult-template5").html();
	itemPostTemplate5 = Handlebars.compile(itemPostSource5);
	itemPostSource6 = $("#itemSearchResult-template6").html();
	itemPostTemplate6 = Handlebars.compile(itemPostSource6);
	itemPostSource7 = $("#itemSearchResult-template7").html();
	itemPostTemplate7 = Handlebars.compile(itemPostSource7);
	//source = $("#suggestions-template").html();
    //template = Handlebars.compile(source);
	sourceWTB = $("#wantToBuylist-template").html();
	templateWTB = Handlebars.compile(sourceWTB);
	//$("#wanttobuyUser").html(templateWTB(itemWantUser1));
	//console.log(itemWantUser)
	//$("#itemSearchResults").html(itemPostTemplate(itemSearchResults));

//	fillItemSearchPanel(itemPostTemplate,window.targetUser.wishList)
//	fillUserSuggestionPanel()
	//$("#itemSearchResults").children()[0]
	//handleItemWithdraw();
	fillItemPanel(window.targetUser.wishList)
	//handleItemWithdraw()
	
})




function handleConfirmBtn(){
	$(".wantconfirmedButton").click(function(){
		var userID = $(this).attr('value')
		var itemID = $(this).attr('ID')
		var choice = confirm("Sell "+itemID+" to "+userID +" ?\n")
		if(choice == true){
			console.log("you chose yes")
			$.post('toInitiateConfirmation',{"counterPartyID" : userID,"itemID" : itemID},function(data){
				if(data.succeed)
					console.log("initializeConfirmation Successfully")
					fillItemPanel(window.targetUser.wishList)
					$("#confirmed-body").hide()
			})
		}
		else{
			console.log("you chose cancel")
		}
	})
	
}

function handleActions(){
	$(".buyButton").click(function(){
      var itemID = $(this).attr('value')
      console.log("click buy: " + itemID)

      if(!include(window.targetUser.wantTobuyItemList, itemID)){
        $.ajax({
          type: "POST",
          url: "/wantToBuy",
          data: {itemID:itemID,message:"I want to buy your item"},
          success: function(data) {
              //Do Something
            console.log("add to shopping cart succeed")
            window.targetUser = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItemPanel(window.targetUser.wishList)
			$("#confirmed-body").hide()
          	
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

            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItemPanel(window.targetUser.wishList)
			$("#confirmed-body").hide()
          	
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

      if(!include(window.targetUser.wishList, itemID)){
        $.ajax({
          url: "/addToWishList",
          data: {"itemID":itemID},
          success: function(data) {
              //Do Something
            console.log("add to wishlist succeed")
            //window.targetUser = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItemPanel(window.targetUser.wishList)
			$("#confirmed-body").hide()
          	
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
            //window.targetUser = data.targetUser

            // refresh whole timeline?
            //fillItemSearchPanel(itemPostTemplate,data.targetUser.wishList,data.targetUser.wantTobuyItemList)
          	fillItemPanel(window.targetUser.wishList)
			$("#confirmed-body").hide()
          	
          },
          error: function(xhr) {
              //Do Something to handle error
          }
        });

      }
    }))
}

function handleCancelbtn(){
	$(".cancelbtn").click(function(){
		var itemID = $(this).attr('value')
		var itemname = $(this).attr('id')
		var choice = confirm("Do not confirmed "+itemname+" ?\n")
		if(choice == true){
			console.log("cancel confirming "+itemname)
			$.post('toCancelConfirmation',{"itemID" : itemID},function(data){
				if(data.succeed){
					console.log("cancel confirm successfully")
					fillItemPanel(window.targetUser.wishList)
					$("#confirmed-body").hide()
				}
			})
		}
		else{
			console.log("still confirm "+itemname)
		}
	})
}

function handleBuyconfirmed(){
	$(".confirmedBuybtn").click(function(){
		var itemID = $(this).attr('value')
		var itemname = $(this).attr('id')
		var choice = confirm("Are you sure that you want to buy "+itemname+" ?\n")
		if(choice == true){
			console.log("confirm "+itemname +" ...")
			$.post('toAcceptConfirmation',{"itemID":itemID},function(data){
				if(data.succeed){
					console.log("confirmed "+itemname + " successfully!")
					fillItemPanel(window.targetUser.wishList)
					$("#confirmed-body").hide()
				}
				
			})
			
		}
	})
}

function handleRejection(){
	$(".confirmedRejectbtn").click(function(){
		var itemID = $(this).attr('value')
		var itemname = $(this).attr('id')
		var choice = confirm("Reject to buy " + itemname +" ?\n")
		if(choice == true){
			console.log("you reject "+itemname)
			$.post('toRejectConfirmation',{"itemID" : itemID},function(data){
				if(data.succeed){
					console.log("successfully reject " + itemname)
					fillItemPanel(window.targetUser.wishList)
					$("#confirmed-body").hide()
				}
			})
		}
		else{
			console.log("you do not reject "+ itemname)
		}
		
	})
}

function fillconfirmlistNew(clickItem){
	var wantUser = {}
	wantUser.wanttobuyUser = []
	$.post('getWantToBuyUserListDetail',{"itemID" : clickItem},function(userlist){
		userlist.forEach(function(suser){
			var wu = {}
			wu.wantBodyID = "wantBody_" + suser._id
			wu.wantUseravatar = suser.avatarLink
			wu.wantuserLink = '/user/' + suser._id
			wu.wantusername = suser.userName
			wu.wantuseruniversity = suser.university
			wu.wantuserID = suser._id
			wu.itemID = clickItem
			wantUser.wanttobuyUser.push(wu)
		})
		console.log(wantUser)
		$("#wanttobuyUser").html(templateWTB(wantUser))
		handleConfirmBtn()
	})
	
}

/*
function fillconfirmlistGet(WTBlist){
	var wantUser = {}
	wantUser.wanttobuyUser = []
	WTBlist.forEach(function(wtbUser){
		var wUserEntry = {}
		var wUserEntry1 = {}
		$.ajax({
			url : "/getUserInfo",
			data : {"userID" : wtbUser},
			success : function(data){
				wUserEntry.wantBodyID = "wantBody_"
				wUserEntry.wantUseravatar = "/images/avatar-default.png"
				wUserEntry.wantuserID = "123456"
				wUserEntry.wantuserLink = "123456"
				wUserEntry.wantusername = "user1"
				wUserEntry.wantuseruniversity = "cuhk"
				//wantUser.wanttobuyUser.push(wUserEntry)
			},
			error : function(){
				console.log("get data failed")
			}
		})
		wantUser.wanttobuyUser.push(wUserEntry)
		wUserEntry1.wantBodyID = "wantBody_"
		wUserEntry1.wantUseravatar = "/images/avatar-default.png"
		wUserEntry1.wantuserID = "123456"
		wUserEntry1.wantuserLink = "123456"
		wUserEntry1.wantusername = "user1"
		wUserEntry1.wantuseruniversity = "cuhk"
		wantUser.wanttobuyUser.push(wUserEntry1)		
	})	
	$("#wanttobuyUser").html(templateWTB(wantUser))
	console.log(templateWTB(wantUser))
	
}

*/
function fillconfirmlist(WTBlist){
	


    //console.log(data)
    // create user suggestion array
	var wantUsers = {}
    wantUsers.wanttobuyUser = []
    //$("#userCount").text(window.searchResult.users.length)
    console.log(WTBlist)
    //console.log(WTBlist.length)
    singleuser2 = {}
    var counts = 1
    WTBlist.forEach(function(wtbUser){
    	var wantUserEntry = {}
    	var wantUserEntry1 = {}
    	var userWant={};
    	$.post('getUserInfo',{"userID": wtbUser},function(targetUser){
		  	//var wantUserEntry = {}
		  	//console.log(data)
		  	singleuser2.wantBodyID = "wantBody_"+targetUser._id
			singleuser2.wantUseravatar = targetUser.avatarLink
			singleuser2.wantuserLink = "/user/" + targetUser._id
			singleuser2.wantusername = targetUser.userName
			singleuser2.wantuseruniversity = '@' +targetUser.university
			singleuser2.wantuserID = targetUser._id
			/*
			wantUserEntry.wantUseravatar = "http://lorempixel.com/250/140/sports"
	      	wantUserEntry.wantusername = "user1"+"inside"
	      	wantUserEntry.wantuserID = "123456"
			wantUserEntry.wantuseruniversity = '@' +"fightting"
			wantUserEntry.wantBodyID = "wantBody_"
			wantUserEntry.wantuserLink = "/user/" 
			$.extend(userWant,targetUser)
			*/
	      	wantUserEntry.wantUseravatar = targetUser.avatarLink
	      	wantUserEntry.wantusername = targetUser.userName
	      	wantUserEntry.wantuserID = targetUser._id
			wantUserEntry.wantuseruniversity = '@' +targetUser.university
			wantUserEntry.wantBodyID = "wantBody_"+targetUser._id
			wantUserEntry.wantuserLink = "/user/" + targetUser._id
			//console.log(include(window.targetUser.followingList, userEntry._id))
	  	});
	  	 wantUserEntry1.wantUseravatar = "http://lorempixel.com/250/140/sports"
	      	wantUserEntry1.wantusername = "user1" + String(counts)
	      	wantUserEntry1.wantuserID = "123456"
			wantUserEntry1.wantuseruniversity = '@' +"fightting"
			wantUserEntry1.wantBodyID = "wantBody_"
			wantUserEntry1.wantuserLink = "/user/" 
	  	wantUsers.wanttobuyUser.push(wantUserEntry1)
	  	wantUsers.wanttobuyUser.push(wantUserEntry)
	  	console.log(userWant)
	  	wantUserEntry.wantUseravatar = userWant.avatarLink
	      	wantUserEntry.wantusername = userWant.userName
	      	wantUserEntry.wantuserID = userWant._id
			wantUserEntry.wantuseruniversity = '@' +userWant.university
			wantUserEntry.wantBodyID = "wantBody_"+userWant._id
			wantUserEntry.wantuserLink = "/user/" + userWant._id
	  	wantUsers.wanttobuyUser.push(wantUserEntry)
	  	counts += 1
    })
    var wantUserEntry = {}
    wantUserEntry.wantUseravatar = "http://lorempixel.com/250/140/sports"
	      	wantUserEntry.wantusername = "user1"
	      	wantUserEntry.wantuserID = "123456"
			wantUserEntry.wantuseruniversity = '@' +"fightting"
			wantUserEntry.wantBodyID = "wantBody_"
			wantUserEntry.wantuserLink = "/user/" 
	wantUsers.wanttobuyUser.push(wantUserEntry)
    console.log(templateWTB)
    console.log(wantUsers)
    //console.log(wantUsers.wanttobuyUser)
    //console.log(userSuggestion)
    //var source1 = $("#wantToBuylist-template").html();
    //console.log(source1)
    //var template1 = Handlebars.compile(source1);
    //console.log(template1)
	//console.log(templateWTB(wantUsers))
    //$("#wanttobuyUser").html(templateWTB(wantUsers));
    itemWantUser1.wanttobuyUser.push(singleuser2)
    $("#wanttobuyUser").html(templateWTB(wantUsers));
    $(".wantconfirmedButton").click(function(){
    	var wantusersID = $(this).attr('value')
    	console.log("successfully click confirmed")
    	console.log(wantusersID)
    });
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

*/
		
};


function handleItemWithdraw(){
	$('.withrawbtn').click(function(){
		var targetItemID = $(this).attr('value');
		var Itemstatus = $(this).attr('id');
		console.log("successfully click withdraw");
		console.log(targetItemID);
		console.log(Itemstatus);
		var statusID=String(Itemstatus) +'id'+targetItemID;
		//$('.itembody'+statusID).remove();
		$.ajax({
			url :'/toWithdrawItem',
			data : {"itemID" : targetItemID},
			success : function(){
				console.log('withdraw ' + targetItemID + ' success')
				var statusID=String(Itemstatus) +'id'+targetItemID;
				$('.itembody'+statusID).remove();
				fillItemPanel(window.targetUser.wishList)
				
				
			},
			error: function(){
				console.log('withdraw failed')
				
			}
		});
	});	
}

function fillItemPanel(currentWishList){
	console.log("refresh ")
	$("#confirmed-body").hide()
    $.get('getMyItem',function(data){
        //console.log(data)
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
			//console.log(item)
			
		//console.log(item)
		var index=item.status
		//console.log(index)
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
		postEntry.itemWTBlist = item.wantToBuyUserList.slice()
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
	    $("#itemSearchResults1").html(itemPostTemplate1(itemPosts[1]));
	    $("#itemSearchResults2").html(itemPostTemplate2(itemPosts[2]));
	    $("#itemSearchResults3").html(itemPostTemplate3(itemPosts[3]));
	    
		$(".confirmedBtn").click(function(){
			console.log('successfully click confirm');
			$("#confirmed-body").show();
			var WTBlist = $(this).attr('value')
			var thisitemID = $(this).attr('id')
			if(WTBlist.length){
				WTBlist = WTBlist.split(',')
				//console.log(WTBlist)
				//fillconfirmlistGet(WTBlist);
				//fillconfirmlist1(WTBlist);
				fillconfirmlistNew(thisitemID);
			}
		});
		handleItemWithdraw();
		handleCancelbtn();
	
    //$('.heartButton').click(function(){});
	
    })
    
    $.get('getwaitForMetoConfirmItemList',function(data){
		var itemAll = {}
		itemAll.itemEntry = []
		data.forEach(function(item,index){
		//console.log(item)
		var index=item.status
		//console.log(index)
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
		postEntry.itemWTBlist = item.wantToBuyUserList.slice()
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
		itemAll.itemEntry.push(postEntry)
		})
		$("#itemSearchResults5").html(itemPostTemplate5(itemAll));
		handleBuyconfirmed()
		handleRejection()
	})
	
	$.get('getboughtItemList',function(data){
		var itemsAll = {}
		itemsAll.itemEntry = []
		data.forEach(function(item,index){
			
		//console.log(item)
		var index=item.status
		//console.log(index)
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
		postEntry.buyID = "buy_" + item._id
		postEntry.heartID = "heart_" + item._id
		postEntry.itemID = item._id
		postEntry.itemWTBlist = item.wantToBuyUserList.slice()
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
		itemsAll.itemEntry.push(postEntry)
		})
		$("#itemSearchResults7").html(itemPostTemplate7(itemsAll));
	})
	
	$.get('getwishList',function(data){
		console.log(data)
		var descriptionLimit = 180
		var allitems = {}
		allitems.itemEntry = []
		data.forEach(function(item,index){
			
		//console.log(item)
		var index=item.status
		//console.log(index)
		var postEntry = {}
		postEntry.avatar = item._creator.avatarLink
		postEntry.creatorName = item._creator.userName
		postEntry.itemName = item.itemName
		postEntry.buyID = "buy_" + item._id
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
		// process buy button
		
		if(!include(window.targetUser.wantTobuyItemList, item._id)){
		
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
		postEntry.itemWTBlist = item.wantToBuyUserList.slice()
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
		allitems.itemEntry.push(postEntry)
		})
		$("#itemSearchResults6").html(itemPostTemplate6(allitems));
		handleActions()
	})
	
	
}


function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}