$(document).ready(function(){

	$.backstretch('images/3.jpg', {speed: 1000});

	// ======= fill user info for navbar
	fillUserInfo_Navbar(targetUser)
	fillUserInfo_cover(targetUser)


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
        maxFileCount: 3,
        allowedFileExtensions: ["jpg", "gif", "png"]
    });




	$.get( '/userInfo',1, function(data) { 
		console.log(data)
		//$('#userInfo').html(data.local.email); 
	});

	$.get( '/getMyItem',1, function(data) { 
		console.log(data)
		//$('#userInfo').html(data.local.email); 

		data.forEach( function(element, index) {
			console.log(element)
			$('#userItemList').append('<li><a href='+'/updateItem/'+ element._id+'>'+element.itemName+'</a></li>')
		});
	});

})

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}