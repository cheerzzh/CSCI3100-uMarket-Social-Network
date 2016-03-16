$(document).ready(function(){

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
        maxFileCount: 5,
        allowedFileExtensions: ["jpg", "gif", "png"]
    });



	console.log('hi')
	$.get( '/search',1, function(data) { 
		console.log(data)
		$('#results').html(data); 
	});

	$.get( '/userInfo',1, function(data) { 
		console.log(data)
		//$('#userInfo').html(data.local.email); 
	});

	$.get( '/userItem',1, function(data) { 
		console.log(data)
		//$('#userInfo').html(data.local.email); 
	});

})

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}