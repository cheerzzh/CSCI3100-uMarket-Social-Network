function fillUserInfo_Navbar(targetUser){
	// show avatar
	$("#avatar-nav").attr("src",targetUser.avatarLink);
	$("#username-nav").append(targetUser.userName)
}

function fillUserInfo_cover(targetUser){
	// update user info for cover
	$("#avatar-cover").attr("src",targetUser.avatarLink);
	$("#username-cover").text(targetUser.userName)
	$("#email-cover").text(targetUser.local.email)
	$("#statement-cover").text(targetUser.statement)
	$("#university-cover").append(targetUser.university)
	$("#followerNumber").text(targetUser.followerList.length);	
	$("#followingNumber").text(targetUser.followingList.length);	
	$("#itemNumber").text(targetUser.itemList.length);	
}