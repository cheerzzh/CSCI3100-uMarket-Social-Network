$(document).ready(function(){

	console.log('hi')
	$.get( '/search',1, function(data) { 
		console.log(data)
		$('#results').html(data); 
	});



})