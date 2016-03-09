// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '1065990680010-2rei3mfqkd43utm5k0dr8fn6ogs8hdo7.apps.googleusercontent.com',
        'clientSecret'  : '2cB9i1xSVthyBhWBUToTmzyz',
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }

};