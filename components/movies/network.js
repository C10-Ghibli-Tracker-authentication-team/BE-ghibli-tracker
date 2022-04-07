const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')

const router = express.Router();

router.post('/', async function(req, res){
    console.log(req.body.title);
    try{
        await controller.addMovie(req.body)
        response.success(req, res, req.body, 201)
    }catch(error){
        response.error(req, res, 'Unexpected Error', 400, error)
    }
});

router.get('/', async function(req, res) {
    try{
        const moviesList = await controller.listMovies()
        response.success(req, res, moviesList, 200);
    }catch(error){
        response.error(req,res, 'Error inesperado', 400, error)
    }
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