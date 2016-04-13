function checkConversationNavBar(){
  $.ajax({
    type:"GET",
    url:"/getAllConversation",
    
    success:function(data){
      //console.log(data)
      var newConversionCount = 0
      data.forEach(function(entry){
        if((entry.party1._id == targetUser._id) && (entry.hasNewMessage1)){
          newConversionCount ++
        }
        if((entry.party2._id == targetUser._id) && (entry.hasNewMessage2)){
          newConversionCount ++
        }
      })
      //console.log(newConversionCount)
      if(newConversionCount != 0){
       $("#conversation_icon").css("color","#dd4b39")
      }
    },
    error: function(xhr) {
        //Do Something to handle error
    }
  })
}