// app/routes.js
var User            = require('../app/models/user');
var Item = require('../app/models/item');

module.exports = function(app, passport,upload) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        //res.render('index3.ejs'); // load the index.ejs file
        if (req.isAuthenticated())
             res.redirect('/timeline');
        else
            res.render('index3.ejs', { message: req.flash('loginMessage') }); 
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('index3.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    app.post('/login', passport.authenticate('local-login', {
        //successRedirect : '/timeline', // redirect to the secure profile section
        successRedirect : '/timeline', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/signup', passport.authenticate('local-signup', {
        //successRedirect : '/profile', // redirect to the secure profile section
        successRedirect : '/updateProfile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // routers after user logged in
    app.get('/testlogin',isLoggedIn,function(req,res){

        res.send('Hey, you\'ve logged in, ' + req.user.local.email);
    });

    // after sign up, propmt user to updatePersonal info
    app.get('/updateProfile',isLoggedIn,function(req,res){

        //res.send('Hey, you\'ve logged in, ' + req.user.local.email + '\nPlease fill more user info');
        req.flash()
        res.render('updateProfile.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });

    app.post('/updateProfile', isLoggedIn,upload.single('avatar'),function(req,res){

        console.log('updateProfile post  request recieved')
        console.log(req.body)
        // fetch item ID from req
        // fetch parameters from req

        // update item entry in db

        // send back success info
        console.log(req.user._id)
        User.findById(req.user._id, function(err, user) {

            if (err) 
            {   
                // send back error
                //res.redirect()
                throw err;
            }

            // update field
            user.updateDate = Date()
            user.statement = req.body.statement
            user.userName = req.body.userName
            user.university = req.body.university
            user.birthDate = req.body.birthDate

            //console.log(req.file)
            //imageLinks.push('uplaods/' + fileEntry.filename)
            if(req.file)
            {
                user.avatarLink = 'uploads/' + req.file.filename
            }
            
        
            // save the user
            user.save(function(err) {
            if (err) throw err;

            console.log('User profile successfully updated!');
            // redirect to user page, flash successful message
            //res.redirect('/profile',{message:"Profile updated!"})
            res.redirect('/profile')
            
            });
        });
    })

    app.get('/timeline',isLoggedIn,function(req,res){

        //res.send('Hey, you\'ve logged in, ' + req.user.local.email + '\nPlease fill more user info');
        res.render('timeline.ejs', {
            user : req.user// get the user out of session and pass to template
        });

    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // =====================================
    // ADMIN FUNCTION ======================
    // =====================================
    app.get('/admin',function(req,res){

        User.find({}, function(err, user) {

            res.send(user)
        
        });
    });



    // ========= Handle uploadItem call, return data =====
    app.get('/uploadItem',isLoggedIn,function(req,res){

        res.render('uploadItem.ejs',{
            user : req.user // get the user out of session and pass to template
        });
    })

    // given a query key: return related item list and user list
    app.get('/search', isLoggedIn,function(req, res){ 

        // get search key
        console.log(req.query)

        var re = new RegExp('^.*' + req.query.searchKey + '.*$', 'i');
        var returnData = {}

        Item.find()
        .or([{ 'itemName': { $regex: re }}, { 'description': { $regex: re }}])
        .and({_creator: {'$ne':req.user._id }}) // not search own items?
        .sort({'updateDate': -1}).exec(function(err, items) {

            if(err)
            {
                throw err
            }

            // send search display page with data
            returnData.items = items;
            User.find()
            .or([{ 'userName': { $regex: re }}, { 'university': { $regex: re }}])
            .and({_id: {'$ne':req.user._id }}) // not search own items?
            .sort({'updateDate': -1}).exec(function(err, users) {
                if(err) throw err

                returnData.users = users
                res.send(returnData)
            })
        });

        
        // redirect to searh result page with data
        //res.redirect('/')
    });

    app.get('/userInfo', function(req, res){ 

        // test authenticated
        if (req.isAuthenticated())
            res.send(req.user)
        else
            res.send("Guest"); 
    });

    app.get('/allItem', function(req, res){ 

        Item.find({}, function(err, items) {
              if (err) throw err;

              // object of all the users
              //console.log(items);
              res.send(items)
        });
    });


    // =====================================
    // Item  ======================
    // =====================================
    app.post('/postItem', isLoggedIn,upload.array('images', 5),function(req,res){
        console.log('postItem request recieved')
        //console.log(req.body)
        //console.log(req.files);

        // store image for each object in req.files: path
        var newItem = new Item()
        req.files.forEach(function(fileEntry){
            console.log(fileEntry)
            //imageLinks.push('uplaods/' + fileEntry.filename)
            newItem.attachImageLink('uploads/' + fileEntry.filename)
        })

        
        newItem.userEmail = req.user.local.email
        newItem.userID = req.user._id
        newItem.itemName = req.body.itemName
        newItem.description = req.body.description
        newItem.price = req.body.price
        newItem.refLink = req.body.refLink
        newItem.status = 0
        newItem.condition = req.body.condition
        newItem.createDate = Date()
        newItem.updateDate = Date()
        console.log(req.user._id)
        newItem._creator = req.user._id // reference to creator

        newItem.save(function(err) {
            if (err) throw err;

            // direct to item showing page
            res.redirect('/uploadItem')
        })

        
     })


    // update page
    app.get('/updateItem/:itemid',isLoggedIn,function(req,res){

        console.log(req.params.itemid)

        // check item ID and user ID
        Item.findById(req.params.itemid, function(err, item) {

            if (err) 
            {   
                // redirect to item page
                //res.redirect()
                throw err;
                res.redirect('/')
            }

            // check user ID 
            //console.log(item)
            if(req.user._id == item.userID)
            {
                res.render('updateItem.ejs',{data:item, user : req.user});
            }
            else
            {   

                res.redirect('/')
            }

        });
    })

    app.get('/updateItem',isLoggedIn,function(req,res){

        res.redirect('/')
    })

    // ======= update posted item 
    app.post('/updateItemPost', isLoggedIn,upload.array('images', 5),function(req,res){

        console.log('updateItem request recieved')
        console.log(req.body)
        // fetch item ID from req

        var itemID = req.body.itemID

        // fetch parameters from req

        // update item entry in db

        // send back success info
        Item.findById(req.body.itemID, function(err, item) {

            if (err) 
            {   
                // send back error
                //res.redirect()
                throw err;
            }

            // update field
            item.itemName = req.body.itemName
            item.description = req.body.description
            item.price = req.body.price
            item.refLink = req.body.refLink
            item.condition = req.body.condition
            item.updateDate = Date()

            // save the item
            item.save(function(err) {
            if (err) throw err;

            console.log('User successfully updated!');
            // redirect to item page, flash successful message
            res.redirect('/uploadItem')
            
            });
        });
    })


    app.get('/withDrawItem',isLoggedIn,function(req,res){

        // get item id
        // check user id

        // update status

        // send back status
    });

    // =====================================
    // buy  ======================
    // =====================================
    // === user want to buy item : user can send a message to the seller
    app.post('/whatToBuy',isLoggedIn, function(req,res){

        // make sure user can not buy items posted by it self

        // check item status: if is wait for confirm/ confirmed/ withdrawed, send back message

        // add user to item's waiting list

        // send message to seller
        // req.body.message

        // send back success info

    });



    // =====================================
    // wishlist  ======================
    // =====================================
    // ==== user add item to wishlist
    app.get('/addToWishList',isLoggedIn,function(req,res){

        // item id not owned by user
        // should be controlled in front end

    });

     // ==== user remove item to wishlist
    app.get('/removeFromWishList',isLoggedIn,function(req,res){



    });

    // === user retrieve wishlist
    app.get('/getWishList',isLoggedIn,function(req,res){



    });



    // return all item posted by a specific user
    app.get('/getMyItem', isLoggedIn,function(req, res){ 

        // check auth
        if (req.isAuthenticated())
        {
            Item.find({'userID':req.user._id})
            .populate('_creator')
            .exec(function(err, items) {
              if (err) throw err;

              // object of all the users
              //console.log(items);
              res.send(items)
            });
        }
        else
        {
            res.send("Please logged in!");
        }

    });

    app.get('/getUserItem',function(req,res){

        // return all the items posted by a user
        // user id passed in 
    });


    // =====================================
    // Timeline  =======================
    // =====================================
    app.get('/getTimelinePost',isLoggedIn,function(req,res){

        // first just return first 5 items not belongs to users
        //console.log(req.user._id)
        // .select('displayName email profileImageURL') // choose fields
        Item.find({_creator: {'$ne':req.user._id },status:0})
        .limit(10)
        .sort({updateDate: -1})
        .populate('_creator')
        .exec(function(err, items) {
            if(err)
            {
                throw err;
            }

            res.send(items)
        });
        

    });

    app.get('/getAllUser',function(req,res){

        User.find({}, function(err, users) {
              if (err) throw err;

              // object of all the users
              //console.log(users);
              res.send(users)
        });
    })


    // view user profile
    app.get('/user/:userid',isLoggedIn,function(req,res){

        //console.log(req.params.itemid)
        // if targetID == current user, redirect to his own profile
        if(req.params.userid == req.user._id){
            res.redirect('/profile')
        }
        else{
            // check item ID and user ID
            User.findById(req.params.userid, function(err, targetUser) {

                if (err) 
                {   
                    // redirect to item page
                    //res.redirect()
                    throw err;
                    res.redirect('/')
                }

                // check user ID 
                //console.log(item)
                // send user page, flush 2 users
                res.send(targetUser)

            });
        }
        
    })

    app.get('/item/:itemid',isLoggedIn,function(req,res){

        //console.log(req.params.itemid)
        Item.findById(req.params.itemid)
        .populate('_creator')
        .exec(function(err, targetItem) {

            if (err) 
            {   
                // redirect to item page
                //res.redirect()
                throw err;
                res.redirect('/')
            }

            // check user ID 
            //console.log(item)
            // send user page, flush 2 users
            res.send(targetItem)

        });
        
        
    })
    // =====================================
    // Recommadation =======================
    // =====================================

    // GOAL: return user array suggested: 
    // first from user's following's following who he is not following now
    app.get('/getUserSuggestion',isLoggedIn,function(req,res){

        // first just get first 5
        //console.log(req.user._id)
        // .select('displayName email profileImageURL') // choose fields
        User.find({_id: {'$ne':req.user._id }})
        .limit(5)
        .exec(function(err, users) {
            if(err)
            {
                throw err;
            }

            res.send(users)
        });
        
    })
    // randomly return items with status = 0
    //  use: mongoose-random
    app.get('/explore',isLoggedIn,function(req,res){

        Item.findRandom().limit(2).exec(function (err, items) {
            console.log(items);
        });
        
    })


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));


    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined; // remove
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined; // just remove token, keep id for re-link
        user.save(function(err) {
           res.redirect('/profile');
        });
    });

    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');

    //test purpose, not require login
    //return next();
}



