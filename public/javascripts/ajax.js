$(document).ready(function(){

	// With JQuery
	$('#ex1').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
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

})