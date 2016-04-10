var conversationListSource, conversationListTemplate
var bimessageSource, bimessageTemplate

bimessageSource = $("#bimessages-template").html();
bimessageTemplate = Handlebars.compile(bimessageSource);

$(document).ready(function(){
  
    $.backstretch('images/2.jpg', {speed: 1000});
    var source, template;
    
	conversationListSource = $("#contacts-template").html();
	conversationListTemplate = Handlebars.compile(conversationListSource);
    /*
	for notification
    */


	fillConversationList(conversationListTemplate)


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

function fillConversationList(template){

	$.ajax({
        url: "/getAllConversation",
        type:"get",
        success: function(data) {
            //Do Something
            console.log(data)

            
            // attach to panel
        var conversations = {}
		    conversations.conversation = []

		    data.forEach(function(conversationEntry){

		      var suggestionEntry = {}
		      if(targetUser._id == conversationEntry.party1._id){
		        suggestionEntry.user = conversationEntry.party2.userName
		      }
		      else{
		        suggestionEntry.user = conversationEntry.party1.userName
		      }
		        suggestionEntry.conversationId = conversationEntry._id
		        console.log(suggestionEntry.conversationId)
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
		     
		    $('.list-group-item').click(function(){
		    
            
            var conversationId = $(this).attr('value')
            
        $.ajax({
  
            url: "/getAllConversation",
            type:"get",
            success: function(data) {
            //Do Something
            console.log(data)
          
             var bimessages = {}
		         bimessages.bimessage = []
            var temp
            var party1
            var party2
            data.forEach(function(conversationEntry){
             if(conversationId == conversationEntry._id)
             {
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
		    
		    $('#send').click(function(){
		      var sender, receiver,replyConversationID,isReply,content
          sender = targetUser._id
          if(targetUser._id == party1._id)
          {
            receiver = party2._id
          }
          else
          {
            receiver = party1._id
          }
          replyConversationID = conversationId
          isReply = 1
          content = $("textarea#mess").val()
          $.ajax({
           url:"/sendMessage",
           type:"post",
           data:{"sender":sender,"receiver":receiver,"replyConversationID":replyConversationID,"isReply":isReply,"content":content},
           success: function(data1){
            $("#send").val("")
            
          },
          error:function(xhr) {
            //Do Something to handle error
          }
        
          })
		 
      })

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
