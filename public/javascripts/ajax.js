$(document).ready(function(){

	// With JQuery
	$('#ex1').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});

	$("#input-21").fileinput({
		overwriteInitial: false,
        browseClass: "btn btn-success",
        browseLabel: "Pick Image",
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

    $("#input-24").fileinput({
        
        maxFileCount: 5,
        allowedFileExtensions: ["jpg", "gif", "png"],
        initialCaption: "The Moon and the Earth"
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

	$.get( '/allItem',1, function(data) { 
		console.log(data)
		//$('#userInfo').html(data.local.email); 
	});

})