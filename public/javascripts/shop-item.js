/*product object*/
var product = {
    name:"Apple",
    price:"$600",
    description:"See more snippets like this online store item at",
    userID : String,
    userEmail : String,
    itemName : "Apple",
    createDate : Date,
    updateDate : Date,
    imageLinks : [String],
    buy : Boolean,
    free : Boolean,
    condition : Number,
    refLink : String,
    waitingList : [String], // store id of users who what to buy
    status : Number, // 0: in progess 1: wait for confirm  2: confirmed 3: withdrawed
    confirmedCounterParty : String, // id of counterParty

    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    wishedList : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
};




var cap = document.getElementsByClassName("caption")[0];

cap.getElementsByClassName("pull-right")[0].innerHTML = product.price;
cap.getElementsByClassName("productName")[0].innerHTML = product.name;
cap.getElementsByClassName("productDescription")[0].innerHTML = product.description;





<div class="col-md-9">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
    <div class="item active">
    <img class="slide-image" src="http://placehold.it/800x300" alt="">
    </div>
    <div class="item">
    <img class="slide-image" src="http://placehold.it/800x300" alt="">
    </div>
    <div class="item">
    <img class="slide-image" src="http://placehold.it/800x300" alt="">
    </div>
    </div>
    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
    </div>
    </div>


    $(document).ready(function(){


        var source, template;

        //$.backstretch('../assets/images/background-4.jpg', {speed: 1000});
        $.backstretch('images/2.jpg', {speed: 1000});
        $('.cover-pic').backstretch([
            'images/img-1.jpg',
            'images/img-2.jpg',
            'images/img-3.jpg',
            'images/img-4.jpg',
        ], {duration: 2500, fade: 1500});

        $('#new-micropost textarea').autosize();

        var comments = {
            comments: [
                {
                    commenterImage: '<img src="http://lorempixel.com/50/50/people/9" />'
                    commentText: '<p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>'
                },
                {
                    commenterImage: '<img src="http://lorempixel.com/50/50/people/9" />'
                    commentText: '<p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>'
                },
                {
                    commenterImage: '<img src="http://lorempixel.com/50/50/people/9" />'
                    commentText: '<p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>'
                },
                {
                    commenterImage: '<img src="http://lorempixel.com/50/50/people/9" />'
                    commentText: '<p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>'
                }
            ]
        };






        source = $("#comments-template").html();
        template = Handlebars.compile(source);
        $("#comments").html(template(comments));

        var messages = {
            messages: [
                {
                    user: '@rails_freak',
                    message: 'Hey! Checkout my new post. Thanks! <span class="link">p.co/RoRawsme</span>'
                },
                {
                    user: '@blogaholic',
                    message: 'Hey man! Wassup?'
                },
                {
                    user: '@uiux_',
                    message: 'Medium\'s UI is f***ing awesome'
                },
                {
                    user: '@Dev',
                    message: 'What\'s your view on Websockets? Let me know'
                }
            ]
        };

        source = $("#messages-template").html();
        template = Handlebars.compile(source);
        $("#messages").html(template(messages));

        var microposts = {
            microposts: [
                {
                    avatar: 'images/avatar.png',
                    name: 'Blogaholic',
                    username: '@blogaholic',
                    post: 'Building a Bootstrap Theme - Awesome post by <span class="mention">@uiux_</span>' +
                    '<a href="#">p.co/btstrpThm</a>' +
                    '<span class="hashtags">#Theme #Bootstrap</span>',
                    time: '4 mins'
                },
                {
                    avatar: 'images/avatar_2.png',
                    name: 'UI UX Guy',
                    username: '@uiux_',
                    post: 'Published my post on Building a Bootstrap Theme <a href="#">p.co/btstrpThm</a>',
                    time: '7 mins'
                },
                {
                    avatar: 'images/avatar_3.png',
                    name: 'Rails Freak',
                    username: '@rails_freak',
                    post: 'Ruby on Rails is Awesome! <a href="#">p.co/RoRawsme</a> <span class="hashtags">#Rails</span>',
                    time: '9 mins'
                },
                {
                    avatar: 'images/avatar_4.png',
                    name: 'Developer',
                    username: '@Dev',
                    post: 'Websockets are future tech - We aren\'t there yet!' +
                    '<span class="hashtags">#Websockets #Javascript</span>',
                    time: '13 mins'
                },
                {
                    avatar: 'https://en.gravatar.com/userimage/23763355/e7bbf514106dc2fd9ddb4e8160a72e8c.png',
                    name: 'Sudharsanan M',
                    username: '@sudharti',
                    post: 'Why should you do Side Projects <a href="#">p.co/wsydSPr</a>',
                    time: '14 mins'
                },
                {
                    avatar: 'images/avatar_4.png',
                    name: 'Developer',
                    username: '@Dev',
                    post: 'Awesome Read - How maintaining a Blog saved my ass' +
                    '<a href="#">p.co/hmBsAs</a> <span class="hashtags">#Blog</span>',
                    time: '15 mins'
                },
                {
                    avatar: 'images/avatar_2.png',
                    name: 'UI UX Guy',
                    username: '@uiux_',
                    post: 'Medium\'s theme is so f**cking good.' +
                    '<a href="#">p.co/mdmThfg</a>' +
                    '<span class="hashtags">#Medium #CSS</span>',
                    time: '18 mins'
                },
                {
                    avatar: 'images/avatar_3.png',
                    name: 'Rails Freak',
                    username: '@rails_freak',
                    post: 'RT <span class="mention">@sudharti</span>' +
                    'Front-End Javascript frameworks are clearly the future!' +
                    '<span class="hashtags">#Javascript</span>',
                    time: '19 mins'
                },
                {
                    avatar: 'images/avatar.png',
                    name: 'Blogaholic',
                    username: '@blogaholic',
                    post: 'How maintaining a Blog saved my ass' +
                    '<a href="#">p.co/hmBsAs</a>' +
                    '<span class="hashtags">#Blog</span>',
                    time: '20 mins'
                },
            ]
        };

        source = $("#microposts-template").html();
        template = Handlebars.compile(source);
        $("#microposts").html(template(microposts));

        var trends = {
            trends: [
                { trend: '#Theme' },
                { trend: '#Bootstrap' },
                { trend: '#Rails' },
                { trend: '#Blog' },
                { trend: '#Javascript' },
            ]
        };

        source = $("#trends-template").html();
        template = Handlebars.compile(source);
        $("#trends").html(template(trends));

        var suggestions = {
            suggestions: [
                {
                    avatar: 'images/avatar.png',
                    name: 'Bootstrap',
                    username: '@bootstrap',
                },
                {
                    avatar: 'images/avatar_4.png',
                    name: 'Dev',
                    username: '@dev_',
                },
                {
                    avatar: 'images/avatar_2.png',
                    name: 'User123',
                    username: '@user123',
                },
                {
                    avatar: 'images/avatar_3.png',
                    name: 'Rails',
                    username: '@rails',
                },
                {
                    avatar: 'images/avatar_3.png',
                    name: 'Ruby User',
                    username: '@ruby',
                }
            ]
        };

        source = $("#suggestions-template").html();
        template = Handlebars.compile(source);
        $("#suggestions").html(template(suggestions));

    });
/**
 * Created by GP on 10-Apr-16.
 */
