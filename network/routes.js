const express = require('express');
const movies = require('../components/movies/network');
const score = require('../components/movies/network');

const routes = function(server) {
    server.use('/movies', movies);
    server.use('/', score);
};

module.exports = routes;