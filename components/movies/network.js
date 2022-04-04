const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')

const router = express.Router();

router.get('/', function(req, res) {
    response.success(req, res, 'Lista de peliculas');
});

router.post('/score', function(req, res) {
    response.success(req, res, 'Score added succesfully');
    controller.addScore(req.body.user, req.body.score, req.body.movie);
});

router.delete('/score', function(req, res) {
    /* console.log(req.body);
    console.log(req.query); */

    controller.deleteScore(req.body.user, req.body.score, req.body.movie);
    
    if (req.query.error == "ok") {
        response.error(req, res, 'Error inesperado', 500, 'Es solo una simulacion de los errores');
    } else {
        response.success(req, res, 'Borrado correctamente', 203);
    }

});

module.exports = router;