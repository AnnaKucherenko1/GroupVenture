const { User } = require("../models/associations");

const bcrypt = require("bcrypt");

exports.postUser = async (req, res) => {
  const { avatar, firstName, lastName, age, password, email, infoAboutUser } =
    req.body;
  try {
    const user = await User.create({
      avatar,
      firstName,
      lastName,
      age,
      password,
      email,
      infoAboutUser,
    });
    let safeUser = {
      avatar: data.avatar,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      infoAboutUser: data.infoAboutUser,
    };

    res.status(201).json({
      success: true,
      data: safeUser,
      message: "created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUserInfo = async function (req, res) {
  try {
    let user = await User.findOne({ where: { id: req.params.id } });
    res.status = 200;
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (password !== user.password) {
      throw new Error();
    }

    req.session.uid = user.id;
    console.log("req.session ==> ", req.session);
    res.send({ success: true, data: user.id, message: "OK" }).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};

exports.editUser = async function (req, res) {
  const { id, info } = req.body;
  console.log(req.body);
  try {
    const rowsAffected = await User.update(info, { where: { id: id } });
    const usrUpdated = await User.findByPk(id);
    console.log(usrUpdated);
    res.status = 200;
    res.json(usrUpdated);
  } catch (err) {
    console.log(err);
    res.status = 500;
    res.body = err.message;
  }
};
