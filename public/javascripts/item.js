$(document).ready(function(){

	//$.backstretch('images/3.jpg', {speed: 1000});
  	$('.cover-pic').backstretch([
    'images/img-1.jpg',
    'images/img-2.jpg',
    'images/img-3.jpg',
    'images/img-4.jpg',
    ], {duration: 2500, fade: 1500});

  	fillUserInfo_Navbar(window.targetUser)
  	fillUserInfo_cover(window.targetUser)

  	// fillin item info
  	$("#item-description").text(window.targetItem.description)
  	$("#item-name").text(window.targetItem.itemName)
  	$("#item-price").text("$" + window.targetItem.price)
  	
  	$("#item-image_1").attr("src",window.targetItem.imageLinks[0]);

})