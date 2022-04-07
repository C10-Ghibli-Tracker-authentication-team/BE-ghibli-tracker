const express = require('express');
const movies = require('../components/movies/network');
const user = require('../components/user/network');
const emojiScore = require('../components/emojiScore/network');

const routes = function(server) {
    server.use('/movies', movies);
    server.use('/user', user)
    server.use('/emojiScore', emojiScore)
};

module.exports = routes;