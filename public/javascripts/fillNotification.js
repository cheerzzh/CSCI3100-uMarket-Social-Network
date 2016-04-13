var notificationNavSource, notificationNavTemplate

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