const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios')
const baseURL = 'https://api.themoviedb.org/3/'
const apiKey = 'api_key=949bff8e08031ca57f596f86e7440dde'


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//returns all movies by most recent
app.get('/', (req, res) => {
    axios.get(`${baseURL}discover/movie?${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`
    ).then(function (response) {
    //normalize movie results data
    // response.data.results = response.data.results.map(movie=>({[movie.id]: movie}))
      res.send(response.data)
    })
    .catch(function (error) {
        res.status(404);
        return res.end(`Sorry, request could not be made. Please try again later.`);
    });
  });


  //returns results for specific search
  app.get('/search', (req, res) => {
    console.log(req.query)
    //if user searched for a movie
    if(req.query.search === undefined){
        res.status(404);
        return res.end(`Please enter a search term.`);
    }else if (req.query.type === 'movie'){
        axios.get(`${baseURL}search/movie?${apiKey}&query=${req.query.search}`
        ).then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            res.status(404);
            return res.end(`Sorry, request could not be made. Please try again later.`);
        });
    //if user search people
    }else if (req.query.type === 'person'){
        //finds the persons ID number
        axios.get(`${baseURL}search/person?${apiKey}&query=${req.query.search}`
        ).then(function (response) {
            //if Id number is found requests all their movies
            axios.get(`${baseURL}discover/movie?${apiKey}&with_cast=${response.data.results[0].id}`
            ).then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                res.status(404);
                return res.end(`No movies with that actor were found.`);
            });  
        })
        .catch(function (error) {
            res.status(404);
            return res.end(`Person with the name ${req.query.search} could not be found`);
        });
    }
  });

  //gets movie credits
  app.get('/:movieId', (req, res) => {
    if (isNaN(req.params.movieId) == true){
        res.status(404);
        return res.end(`Id must be a number.`);
    }
    //if user searched for a movie
    axios.get(`${baseURL}movie/${req.params.movieId}/credits?${apiKey}&language=en-US`
    ).then(function (response) {
        res.send(response.data)
    })
    .catch(function (error) {
        res.status(404);
        return res.end(`No movie with id number ${req.params.movieId} could be found.`);
    });
  })


// Server Setup
const port = 5000;
const server = http.createServer(app);
server.listen(port);
console.log(port)
module.exports = { server }
