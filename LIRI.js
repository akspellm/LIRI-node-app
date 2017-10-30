var keys = require('./keys.js');
var inquirer = require('inquirer');
var fs = require('fs')
var getTweets = require('./twitter.js')
var spotifyThis = require('./spotify.js')
var movieThis = require('./movie.js')

console.log(keys)

inquirer.prompt([{
        type: 'list',
        message: '\nWhat would you like to do?',
        choices: ['my tweets', 'spotify this song', 'movie this', 'do what it says'],
        name: 'userChoice'
    }

]).then(function(answer) {
    if (answer.userChoice === 'my tweets') {

    	inquirer.prompt([
    		{
    			name: 'userName',
    			message: 'Enter username of Twitter user to display tweets:'
    		}

    		]). then(function(answer) {
    			var screen_name = answer.userName;

    			getTweets(screen_name)
    		})

    } else if (answer.userChoice === 'spotify this song') {
        inquirer.prompt([{
                type: 'list',
                message: 'What would you like to look up?',
                choices: ['artist', 'track'],
                name: 'spotifyType'
            },
            {
                message: 'Enter your search:',
                name: 'spotifySearch'
            }
        ]).then(function(answer) {
            var type = answer.spotifyType;
            var search = answer.spotifySearch;

            if (search === "") {
                if (type == "track") {
                    search = "I saw the sign";
                } else {
                    search = "Ron Hamrick";
                }
            }

            spotifyThis(type, search);

        })

    } else if (answer.userChoice === 'movie this') {
        inquirer.prompt([{
            message: 'Enter a movie to look up:',
            name: 'movieChoice'
        }]).then(function(answer) {

            var movieEntry = answer.movieChoice;

            if (movieEntry === "") {
            	movieEntry = "Mr Nobody";
            }

            var movie = movieEntry.split(' ')

            movieThis(movie);
        })

    } else {

        fs.readFile('random.txt', 'utf8', function(error, data) {
            if (error) {
                return console.log(error)
            }

            var doThis = data.split(',');

            if (doThis[0] === 'spotify-this-song') {
                spotifyThis('track', doThis[1])
            } 

            else if (doThis[0] === 'movie-this') {
                var movieEntry = doThis[1];
                var movie = movieEntry.split(' ')

                movieThis(movie);
            } 

            else if (doThis[0] === 'my_tweets') {
                getTweets();
            }
        })
    }
})