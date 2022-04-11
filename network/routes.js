const express = require('express');
const movies = require('../components/movies/network');
const {user, auth} = require('../components/user/network');
const emojiScore = require('../components/emojiScore/network');
const authenticate = require('../middleware/auth')

const routes = function(server) {
    server.use('/movies', authenticate, movies);
    server.use('/user',authenticate, user)
    server.use('/', auth)
    server.use('/emojiScore', authenticate, emojiScore)
};

module.exports = routes;