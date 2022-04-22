import {
  addMovie as _addMovie, getMovies, existMovie, getMovieById,
} from './store';
import {
  hasWatched as _hasWatched, removeWatched, addWatched, getUserById,
} from '../user/store';
import { getScoreByUser } from '../starScore/store';
import { getScoreByUser as _getScoreByUser } from '../emojiScore/store';

async function addMovie(movie) {
  try {
    return await _addMovie(movie);
  } catch (error) {
    throw ('No se pudieron obtener los datos');
  }
}

async function addListOfMovies(movies) {
  try {
    movies.map(async (movie) => {
      const newMovie = {
        title: movie.title,
        originalTitle: movie.original_title,
        originalTitleRomanised: movie.original_title_romanised,
        imageUrl: movie.image,
        director: movie.director,
        producer: movie.producer,
        runningTime: movie.running_time,
        rtScore: movie.rt_score,
        wikiUrl: `https://ghibli.fandom.com/wiki/${movie.title.replaceAll(' ', '_')}`,
        releaseDate: movie.release_date,
      };
      await _addMovie(newMovie);
    });
  } catch (error) {
    throw ('No se pudieron obtener los datos');
  }
}

async function listMovies() {
  try {
    return await getMovies();
  } catch (error) {
    throw ('No se pudieron obtener los datos');
  }
}

async function watchedMovie(userID, movieID) {
  try {
    const movie = await existMovie(movieID);
    if (!movie) {
      throw (`No se encontro una pelicula con este id  ${movieID}`);
    }
    const hasWatched = await _hasWatched(userID, movieID);
    if (hasWatched) {
      await removeWatched(userID, movieID);
    } else {
      await addWatched(userID, movieID);
    }

    const user = await getUserById(userID);
    const { watchedMovies } = user;

    const scoreStarFind = await getScoreByUser(movieID, userID);
    const scoreEmojiFind = await _getScoreByUser(movieID, userID);

    const actualMovie = await getMovieById(movieID);

    return {
      ...actualMovie,
      watched: watchedMovies.includes(movieID),
      starScore: scoreStarFind,
      emojiScore: scoreEmojiFind,
    };
  } catch (error) {
    throw ('No se pudieron obtener los datos');
  }
}

async function getMovie(userID, movieID) {
  try {
    const actualMovie = await getMovieById(movieID);
    if (!actualMovie) {
      throw (`No se encontro una pelicula con este id  ${movieID}`);
    }
    const user = await getUserById(userID);
    const { watchedMovies } = user;

    const scoreStarFind = await getScoreByUser(movieID, userID);
    const scoreEmojiFind = await _getScoreByUser(movieID, userID);

    return {
      ...actualMovie,
      watched: watchedMovies.includes(movieID),
      starScore: scoreStarFind,
      emojiScore: scoreEmojiFind,
    };
  } catch (error) {
    console.log(error);
    throw ('No se pudieron obtener los datos');
  }
}

export {
  listMovies,
  addMovie,
  addListOfMovies,
  watchedMovie,
  getMovie,
};
