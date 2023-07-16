const { User } = require("../models/associations");
const bcrypt = require("bcrypt");
const { validatePassword } = require("../helpers/user");
const { responseHandler } = require("../helpers/common");

exports.postUser = async (req, res) => {
  try {
    const { avatar, infoAboutUser, firstName, lastName, age, password, email } =
      req.body;

    const isValidPassword = validatePassword(password);

    if (!isValidPassword) {
      return responseHandler(
        res,
        400,
        false,
        null,
        `Password does not meet the requirements`
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      avatar,
      firstName,
      lastName,
      age,
      password: hash,
      email,
      infoAboutUser,
    });
    const savedUser = {
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      infoAboutUser: user.infoAboutUser,
    };

    return responseHandler(
      res,
      200,
      true,
      savedUser,
      `User has been created`
    );
  } catch (err) {
    console.error(`Create user failed: ${err.message}`);
    if (err.name === "SequelizeUniqueConstraintError") {
      return responseHandler(res, 400, false, null, "User with this email already exists");
    } else {
      return responseHandler(res, 500, false, null);
    }
  }
};

exports.getUserInfo = async function (req, res) {
  try {
    const userId = req.params.id;

    if (!userId) {
      return responseHandler(
        res,
        400,
        false,
        null,
        "UserId missing in the request query."
      );
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return responseHandler(
        res,
        404,
        false,
        null,
        `User not found`
      );
    }
    const safeUserInfo = {
      id: user.id,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      infoAboutUser: user.infoAboutUser,
    };

    return responseHandler(
      res,
      200,
      true,
      safeUserInfo,
      `User fetched`
    );
  } catch (err) {
    console.error(`Get user info failed: ${err.message}`);
    return responseHandler(res, 500, false, null);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    const validatedPassword = await bcrypt.compare(password, user.password);

    if (!validatedPassword) {
      return responseHandler(
        res,
        401,
        false,
        null,
        `Email or password is incorrect`
      );
    }

    req.session.uid = user.id;
    return responseHandler(
      res,
      200,
      true,
      user.id,
      `User logged in`
    );
  } catch (err) {
    console.error(`User log in failed: ${err.message}`);
    return responseHandler(res, 500, false, null);
  }
};

exports.logout = (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        throw new Error(`Session destroy failed: ${error.message}`)
      } else {
        res.clearCookie("sid");
        return responseHandler(
          res,
          200,
          true,
          null,
          `Logout successful`
        );
      }
    });
  } catch(err) {
    console.error(`User log out failed: ${err.message}`);
    return responseHandler(res, 500, false, null, "Could not log out, please try again.");
  }
};

exports.editUser = async function (req, res) {
  try {
    const { id, info } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return responseHandler(
        res,
        404,
        false,
        null,
        `User not found`
      );
    }

    let userUpdated = {};
    if (info.password) {
      const hash = await bcrypt.hash(info.password, 10);
      userUpdated = await user.update({ ...req.body.info, password: hash });
      await user.save();
    } else {
      delete req.body.info.password;
      userUpdated = await user.update({
        ...req.body.info,
        password: user.password,
      });
      await user.save();
    }

    return responseHandler(
      res,
      200,
      true,
      userUpdated,
      `User has been updated`
    );
  } catch (err) {
    console.error(`User log out failed: ${err.message}`);
    return responseHandler(res, 500, false, null);
  }
};
