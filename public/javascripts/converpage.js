var conversationListSource, conversationListTemplate
var notificationListSource, notificationListTemplate
var bimessageSource, bimessageTemplate
var instantConversation
conversationListSource = $("#contacts-template").html();
conversationListTemplate = Handlebars.compile(conversationListSource);
notificationListSource = $("#wholenotifications-template").html();
notificationListTemplate = Handlebars.compile(notificationListSource);
bimessageSource = $("#bimessages-template").html();
bimessageTemplate = Handlebars.compile(bimessageSource);

$(document).ready(function(){
  
    $.backstretch('images/3.jpg', {speed: 1000});
    var source, template;

    /*
	for notification
    */
	fillConversationList(conversationListTemplate)
    fillNotificationList(notificationListTemplate)

  fillUserInfo_Navbar(targetUser)
  fillUserInfo_cover(targetUser)

    notificationNavSource = $("#notifications-template").html();
  notificationNavTemplate = Handlebars.compile(notificationNavSource);
  checkConversationNavBar()
  fillNotificationNavBar(notificationNavTemplate)
  
 
  

  
});

function fillNotificationList(template){
        //console.log("1")
    	$.ajax({
        url: "/getAllNotification",
        type:"POST",
        success: function(data) {
            //Do Something
            //console.log(data)

            
            // attach to panel
        var notificationList = {}
		    notificationList.wholenotifications = []
		  var newNotificationCount = 0

		    data.forEach(function(notificationEntry){

		      var suggestionEntry = {}
		        suggestionEntry.title = notificationEntry.title
		        suggestionEntry.content = notificationEntry.content
		        suggestionEntry.link = notificationEntry.link
                suggestionEntry.wholenotification_id = notificationEntry._id

            if(!notificationEntry.hasRead){
            suggestionEntry.backgroundStyle = "background-color:#ECF5FF";
          //temp.style1 = "<i class='fa fa-circle' style='color:red;'></i>"
             newNotificationCount ++
             }else{
             suggestionEntry.backgroundStyle = "";
             }
		      notificationList.wholenotifications.push(suggestionEntry)
		    })
		  $("#wholenotifications").html(template(notificationList));
		  //console.log(template(notificationList))
		  
		 $(".wholename").click(function(){
        var notificationID =  $(this).attr('value')
        //console.log(notificationID)
         $.ajax({
          type:"post",
          url: "/readNotification",
          data: {"notificationID":notificationID},

          success: function(data) {
            console.log(data)
            fillNotificationList(notificationListTemplate)
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


function fillConversationList(template){

	$.ajax({
        url: "/getAllConversation",
        type:"get",
        success: function(data) {
            //Do Something
            //console.log(data)

            
            // attach to panel
        var conversations = {}
		    conversations.conversation = []

		    data.forEach(function(conversationEntry){

		      var suggestionEntry = {}
		      if(targetUser._id == conversationEntry.party1._id){
		        suggestionEntry.user = conversationEntry.party2.userName
		        if(conversationEntry.hasNewMessage1){
                suggestionEntry.backgroundStyle = "background-color:#ECF5FF";
                }
                else{
                 suggestionEntry.backgroundStyle = "";
                }
		      }
		      else{
		        suggestionEntry.user = conversationEntry.party1.userName
		        if(conversationEntry.hasNewMessage2){
                suggestionEntry.backgroundStyle = "background-color:#ECF5FF";
                }
                else{
                 suggestionEntry.backgroundStyle = "";
                }
		      }
		        suggestionEntry.conversationId = conversationEntry._id
		        //console.log(suggestionEntry.conversationId)
		        var tempmessage = conversationEntry.messageList[conversationEntry.messageList.length-1]
		        if(tempmessage.sender == conversationEntry.party1._id)
		        {
		          var sender = conversationEntry.party1.userName.concat(":")

		          suggestionEntry.message = sender.concat(tempmessage.content)
		        }
		        else
		        {
		          var sender = conversationEntry.party2.userName.concat(":")
		          suggestionEntry.message = sender.concat(tempmessage.content)
		        }
		        
		         
		      conversations.conversation.push(suggestionEntry)
		    })
		  $("#contacts").html(template(conversations));


		
		 $('.conversationlist').unbind()
    	 $('.conversationlist').click(function(){
        var conversationId = $(this).attr("value")
        //console.log(conversationId)
        $.ajax({
  
            url: "/getAllConversation",
            type:"get",
            success: function(data) {
            //Do Something
           // console.log(data)
            
            var bimessages = {}
		    bimessages.bimessage = []
            var temp
            var party1
            var party2
            data.forEach(function(conversationEntry){
             if(conversationId == conversationEntry._id)
             {
               instantConversation = conversationEntry
               temp = conversationEntry.messageList
               party1 = conversationEntry.party1
               party2 = conversationEntry.party2
              }
            })
              if(!instantConversation.referencedItem){}
              else{
                $("#relatedItem").attr("href","/item/"+instantConversation.referencedItem._id)
                $("#relatedItem").text(" (item: "+instantConversation.referencedItem.itemName+")")
                $("#relatedItem").attr("style","color:#5AE1B5")
              }
            // attach to panel
              //console.log(temp)
		      temp.forEach(function(bimessageEntry){

		      var suggestionEntry = {}
		      if(bimessageEntry.sender == party1._id){
		        suggestionEntry.imgsource = party1.avatarLink
		        suggestionEntry.sender = party1.userName
		      }
		      else{
		        suggestionEntry.imgsource = party2.avatarLink
		        suggestionEntry.sender = party2.userName
		      }
		        var date = bimessageEntry.createTime.slice(0,10)
		        var concretetime = bimessageEntry.createTime.slice(15,19)
		        suggestionEntry.time = date + " " + concretetime
		        suggestionEntry.bimessage = bimessageEntry.content
		         
		      bimessages.bimessage.push(suggestionEntry)
		    })
		   
		    $("#bimessages").html(bimessageTemplate(bimessages));
		    
                 $.ajax({
                 type:"get",
                 url: "/readConversation",
                 data: {"conversationID":conversationId, "userID":targetUser._id},
                  success: function(data) {
                    //console.log(data)
                    fillConversationList(conversationListTemplate)
                  },
               error: function(xhr) {
              //Do Something to handle error
          }
        });
		    
            },
            error: function(xhr) {
            //Do Something to handle error
            }
            });
    })
		  $('#send').unbind()
		  $('#send').click(function(){
		  if(!instantConversation){return;}
		  content = $("textarea#mess").val()
		  if(!content){return;}
		  var sender, receiver,replyConversationID,isReply,content
          sender = targetUser._id
          if(targetUser._id == instantConversation.party1._id)
          {
            receiver = instantConversation.party2._id
          }
          else
          {
            receiver = instantConversation.party1._id
          }
          replyConversationID = instantConversation._id
          isReply = 1
          
          //console.log("123")
          $.ajax({
           url:"/sendMessage",
           type:"post",
           data:{"sender":sender,"receiver":receiver,"replyConversationID":replyConversationID,"isReply":isReply,"content":content},
           success: function(data1){
            $("textarea#mess").val("")
            	
            	$.ajax({
                 url: "/getAllConversation",
                 type:"get",
                success: function(data2) {
               //Do Something
            
            // attach to panel
            conversations = {}
		    conversations.conversation = []

		    data2.forEach(function(conversationEntry){

		      var suggestionEntry = {}
		      if(targetUser._id == conversationEntry.party1._id){
		        suggestionEntry.user = conversationEntry.party2.userName
		      }
		      else{
		        suggestionEntry.user = conversationEntry.party1.userName
		      }
		        suggestionEntry.conversationId = conversationEntry._id
		        var tempmessage2 = conversationEntry.messageList[conversationEntry.messageList.length-1]
		        if(tempmessage2.sender == conversationEntry.party1._id)
		        {
		          var sender2 = conversationEntry.party1.userName.concat(":")
		          suggestionEntry.message = sender2.concat(tempmessage2.content)
		        }
		        else
		        {
		          var sender2 = conversationEntry.party2.userName.concat(":")
		          suggestionEntry.message = sender2.concat(tempmessage2.content)
		        }
		         
		      conversations.conversation.push(suggestionEntry)
		    })
		    $("#contacts").html(template(conversations));
		    
		     $.ajax({
  
            url: "/getAllConversation",
            type:"get",
            success: function(data) {
            //Do Something
            //console.log(data)
          
            var bimessages = {}
		    bimessages.bimessage = []
            var temp
            var party1
            var party2
            data.forEach(function(conversationEntry){
             if(replyConversationID == conversationEntry._id)
             {
               instantConversation = conversationEntry
               temp = conversationEntry.messageList
               party1 = conversationEntry.party1
               party2 = conversationEntry.party2
              }
            })
            // attach to panel

		      temp.forEach(function(bimessageEntry){

		      var suggestionEntry = {}
		      if(bimessageEntry.sender == party1._id){
		        suggestionEntry.imgsource = party1.avatarLink
		        suggestionEntry.sender = party1.userName
		      }
		      else{
		        suggestionEntry.imgsource = party2.avatarLink
		        suggestionEntry.sender = party2.userName
		      }
		        var date = bimessageEntry.createTime.slice(0,10)
		        var concretetime = bimessageEntry.createTime.slice(15,19)
		        suggestionEntry.time = date + " " + concretetime
		        suggestionEntry.bimessage = bimessageEntry.content
		         
		      bimessages.bimessage.push(suggestionEntry)
		    })
		   
		    $("#bimessages").html(bimessageTemplate(bimessages));
		    
		  $('.list-group-item').unbind()
		  $('.list-group-item').click(function(){
        var conversationId = $(this).attr("value")
       // console.log(conversationId)
        $.ajax({
  
            url: "/getAllConversation",
            type:"get",
            success: function(data) {
            //Do Something
            //console.log(data)
          
            var bimessages = {}
		    bimessages.bimessage = []
            var temp
            var party1
            var party2
            data.forEach(function(conversationEntry){
             if(conversationId == conversationEntry._id)
             {
               instantConversation = conversationEntry
               temp = conversationEntry.messageList
               party1 = conversationEntry.party1
               party2 = conversationEntry.party2
              }
            })
            // attach to panel

		      temp.forEach(function(bimessageEntry){

		      var suggestionEntry = {}
		      if(bimessageEntry.sender == party1._id){
		        suggestionEntry.imgsource = party1.avatarLink
		        suggestionEntry.sender = party1.userName
		      }
		      else{
		        suggestionEntry.imgsource = party2.avatarLink
		        suggestionEntry.sender = party2.userName
		      }
		        var date = bimessageEntry.createTime.slice(0,10)
		        var concretetime = bimessageEntry.createTime.slice(15,19)
		        suggestionEntry.time = date + " " + concretetime
		        suggestionEntry.bimessage = bimessageEntry.content
		         
		      bimessages.bimessage.push(suggestionEntry)
		    })
		   
		    $("#bimessages").html(bimessageTemplate(bimessages));
		    
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
          },
          error:function(xhr) {
            //Do Something to handle error
          }
        
          });

    },
        error: function(xhr) {
            //Do Something to handle error
        }
    });
		  })
        },
        error:function(xhr){
            
        }
    })
}