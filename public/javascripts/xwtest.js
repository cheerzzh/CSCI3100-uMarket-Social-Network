$(document).ready(function(){
    console.log(targetData)
    $.get('getMyItem',function(data){
        console.log(data)
		data.forEach( function(element, index) {
			console.log(element)
			var pr = "<p>price"+element.price+"</p>"
			var descri = "<p>description:" + element.description +"</p>"
			var item = $("<a></a>").attr('href','/updateItem/'+ element._id)
			item.attr('class','list-group-item')
			item.append('<img src="#" alt="" >')
			item.append("<p>"+element.itemName+"</p>")
			item.append(pr)
			item.append(descri)
			var bttns = $("<p></p>")
			bttns.append('<a href="#" class="btn btn-primary" role="button">close</a>')
			bttns.append('<a href="#" class="btn btn-default" role="button">delete</a>')
			item.append(bttns)
			if(element)
			$('.list-group').append(item)
		}); 
    })
    
});
