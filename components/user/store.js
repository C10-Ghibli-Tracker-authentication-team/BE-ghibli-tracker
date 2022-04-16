import bcrypt from 'bcrypt';
import Model from './model';

async function addUser({ userName, password, profilePic }) {
  try {
    const user = {
      userName,
      password: password && await bcrypt.hash(password, 10),
      profilePic: profilePic || `${process.env.HOST}:${process.env.PORT}/app/files/default_image.jpeg`,
    };
    const newUser = new Model(user);
    return newUser.save();
  } catch (error) {
    console.log(error);
    throw ('Unexpected error');
  }
}

async function getUser({ userName }) {
  try {
    return await Model.findOne({ userName }).exec();
  } catch (error) {
    console.log(error);
    throw ('Unexpected error');
  }
}

async function getUserById(userID) {
  try {
    const user = await Model.findById(userID);
    return user;
  } catch (error) {
    console.log(error);
    throw ('Unexpected error');
  }
}

async function updateUser(user, data) {
  try {
    const updatedUser = await Model.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: data,
      },
      { new: true },
    );

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw ('Unexpected error');
  }
}

async function addWatched(userID, movieID) {
  try {
    await Model.updateOne(
      {
        _id: userID,
      },
      {
        $push:
        {
          watchedMovies:
            movieID,
        },
      },
    );
  } catch (error) {
    console.log(error);
    throw ('Unexpected error');
  }
}

async function removeWatched(userID, movieID) {
  try {
    await Model.updateOne(
      {
        _id: userID,
      },
      {
        $pull:
        {
          watchedMovies:
            movieID,
        },
      },
    );
  } catch (error) {
    console.log(error);
    throw ('Unexpected error');
  }
}

async function hasWatched(userID, movieID) {
  try {
    const hasWatched = await Model.exists({
      _id: userID,
      watchedMovies: { $all: [movieID] },
    });
    return hasWatched;
  } catch (error) {
    console.log(error);
    throw ('Unexpected error');
  }
}

export {
  addUser,
  getUser,
  getUserById,
  updateUser,
  addWatched,
  removeWatched,
  hasWatched,
};
