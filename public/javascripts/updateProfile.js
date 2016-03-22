$(document).ready(function(){


	$.backstretch('images/3.jpg', {speed: 1000});


	$("#input-21").fileinput({
		overwriteInitial: false,
        browseClass: "btn btn-success",
        browseLabel: "Pick Image(s)",
        browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
        removeClass: "btn btn-danger",
        removeLabel: "Delete",
        removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
        uploadClass: "btn btn-info",
        uploadLabel: "Upload",
        uploadIcon: "<i class=\"glyphicon glyphicon-upload\"></i> ",
        maxFileCount: 1,
        allowedFileExtensions: ["jpg", "gif", "png"]
    });

	console.log(targetUser)
	// fill in original user info
	$("#userName").val(targetUser.userName)
	$("#university").val(targetUser.university)
	$("#statement").val(targetUser.statement)
	$("#birthDate").val(targetUser.birthDate.split("T")[0])

	// update user info
	// show avatar
	$("#avatar-nav").attr("src",targetUser.avatarLink);
	$("#avatar-cover").attr("src",targetUser.avatarLink);

	$("#username-nav").append(targetUser.userName)
	$("#username-cover").text(targetUser.userName)
	$("#email-cover").text(targetUser.local.email)
	$("#statement-cover").text(targetUser.statement)
	$("#university-cover").append(targetUser.university)

});