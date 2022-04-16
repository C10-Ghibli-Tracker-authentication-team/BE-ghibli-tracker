import express from 'express';
import { success, error as _error } from '../../network/response';
import {
  addMovie, getMovie, listMovies, likeMovie,
} from './controller';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await addMovie(req.body);
    success(req, res, req.body, 201);
  } catch (error) {
    _error(req, res, error, 400);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movieList = await getMovie(req.user._id, req.params.id);
    success(req, res, movieList, 200);
  } catch (error) {
    _error(req, res, error, 400);
  }
});

router.get('/', async (req, res) => {
  try {
    const movieList = await listMovies();
    success(req, res, movieList, 200);
  } catch (error) {
    _error(req, res, error, 400);
  }
});

router.post('/likeMovie', async (req, res) => {
  try {
    const movie = await likeMovie(req.user._id, req.body.movieId);
    success(req, res, movie, 200);
  } catch (error) {
    _error(req, res, error, 400);
  }
});

export default router;
