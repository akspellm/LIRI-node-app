var request = require('request')

var movieThis = function(movie) {

    var url = 'http://www.omdbapi.com/?apikey=40e9cece&t=';
    if (movie.length > 1) {
        for (var x = 0; x < movie.length - 1; x++) {
            url += movie[x] + "+";
        }

        url += movie[movie.length - 1]
    } else {
        url += movie;
    }

    request(url, function(error, response, body) {
        var movieData = JSON.parse(body)
        console.log('Title: ' + movieData.Title)
        console.log('Year: ' + movieData.Year)
        console.log('IMDB Rating: ' + movieData.Ratings[0].Value)
        console.log('Rotton Tomatoes Rating: ' + movieData.Ratings[1].Value)
        console.log('Country: ' + movieData.Country)
        console.log('Language: ' + movieData.Language)
        console.log('Plot: ' + movieData.Plot)
        console.log('Actors: ' + movieData.Actors)
    });
}

module.exports = movieThis;