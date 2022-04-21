import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { getUser, addUser as _addUser, updateUser as _updateUser } from './store';

require('dotenv').config();

async function addUser(newUser) {
  try {
    if (!newUser.userName || !newUser.password) {
      throw ('No se ingresaron los datos correctos');
    }

    const foundUser = await getUser(newUser);

    if (foundUser) {
      throw ('Este usuario ya existe');
    }

    const user = await _addUser(newUser);
    delete user._doc.password;
    const token = sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
    );

    return {
      _id: user._id,
      userName: user.userName,
      profilePic: user.profilePic,
      token,
    };
  } catch (error) {
    console.log(error);
    throw (error);
  }
}

async function findUser(userFind) {
  try {
    if (!userFind.userName || !userFind.password) {
      throw ('No se ingresaron los datos correctos');
    }

    const user = await getUser(userFind);

    if (!user) {
      throw ('Este usuario no existe');
    }

    const valid = await compare(userFind.password, user.password);

    if (!valid) {
      throw ('Datos incorrectos');
    }
    delete user._doc.password;
    const token = sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
    );

    return {
      _id: user._id,
      userName: user.userName,
      profilePic: user.profilePic,
      token,
    };
  } catch (error) {
    console.log(error);
    throw ('Datos incorrectos');
  }
}

async function updateUser(updatedUser, password, profilePic) {
  try {
    let profilePicUrl = '';
    if (!profilePic && !password) {
      throw ('No se ingresaron los datos correctos');
    }

    if (profilePic) {

      if (process.env.NODE_ENV === 'development') {
        profilePicUrl = `http://${process.env.HOST}:${process.env.PORT}/app/files/${profilePic.filename}`;
      } else {
        profilePicUrl = `https://${process.env.HOST}/app/files/${profilePic.filename}`;
      }
      
    }

    const data = {
      profilePic: profilePicUrl || profilePic,
      password: password ? await hash(password, 10) : password,
    };

    const user = await _updateUser(updatedUser, data);
    delete user._doc.password;
    return {
      _id: user._id,
      userName: user.userName,
      profilePic: user.profilePic,
    };
  } catch (error) {
    console.log(error);
    throw ('Datos incorrectos');
  }
}

async function findOrCreate(userFind) {
  try {
    let user = await getUser({ userName: userFind.email });
    if (!user) {
      const newUser = {
        userName: userFind.email,
        profilePic: userFind.picture.data.url,
      };
      user = await _addUser(newUser);
    }

    if (user.password) {
      delete user._doc.password;
    }

    const token = sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
    );
    return {
      _id: user._id,
      userName: user.userName,
      profilePic: user.profilePic,
      token,
    };
  } catch (error) {
    console.log(error);
    throw (error);
  }
}

export {
  addUser,
  findUser,
  updateUser,
  findOrCreate,
};
