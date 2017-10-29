var keys = require('./keys.js');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyThis = function(type, search) { 
            
            var spotifyApi = new SpotifyWebApi(keys.spotifyKeys);

            spotifyApi.clientCredentialsGrant()
                .then(function(data) {

                    // Save the access token so that it's used in future calls
                    spotifyApi.setAccessToken(data.body['access_token']);

                    if (type === 'track') {
                        spotifyApi.searchTracks(search)
                            .then(function(data) {
                                console.log();
                                console.log('Artist: ' + data.body.tracks.items[0].album.artists[0].name);
                                console.log('Song: ' + data.body.tracks.items[0].name);
                                console.log('Link: ' + data.body.tracks.items[0].external_urls.spotify);

                            }, function(err) {
                                console.log(err);
                            })
                    } else if (type === 'artist') {
                        spotifyApi.searchArtists(search)
                            .then(function(data) {
                                console.log();
                                console.log('Artist Name: ' + data.body.artists.items[0].name);
                                console.log('Artist Page: ' + data.body.artists.items[0].href);
                                console.log('Genres: ' + data.body.artists.items[0].genres);

                            }, function(err) {
                                console.log(err);
                            })
                    }

                }, function(err) {
                    console.log('Something went wrong when retrieving an access token', err.message);
                });
 }

 module.exports = spotifyThis;