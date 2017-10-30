var Twitter = require('twitter');
var keys = require('./keys.js');;

var getTweets = function(user) {

    var client = new Twitter(keys.twitterKeys)

    var params = { screen_name: user };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var x = 0; x < 10; x++) {
                console.log('*************')
                console.log(tweets[x].created_at)
                console.log()
                console.log(tweets[x].text)
                console.log('*************')
                console.log()
            };
        } else {
            console.log(error)
        }
    });
};

module.exports = getTweets;