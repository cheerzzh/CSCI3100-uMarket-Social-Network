/*categories*/
var index;
var category= ["A","B","C","D"];
//for	(index = 0; index < category.length; index++) {
//  category[index]="Category "+(index +1);
//}
for	(index = 0; index < category.length; index++) {
    document.getElementsByClassName("list-group-item")[index].innerHTML = category[index];
}
/*product object*/
var product = {
    name:"Apple",
    price:"$600",
    description:"See more snippets like this online store item at",
};

var cap = document.getElementsByClassName("caption")[0];

cap.getElementsByClassName("pull-right")[0].innerHTML = product.price;
cap.getElementsByClassName("productName")[0].innerHTML = product.name;
cap.getElementsByClassName("productDescription")[0].innerHTML = product.description;