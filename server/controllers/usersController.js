const { User } = require("../models/associations");

const bcrypt = require("bcrypt");

exports.postUser = async (req, res) => {
  const { avatar, firstName, lastName, age, password, email, infoAboutUser } =
    req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user)
    return res
      .status(409)
      .send({ error: "409", message: "User already exists" });
  try {
    if (password === "") throw new Error();
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
    let safeUser = {
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      infoAboutUser: user.infoAboutUser,
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
    if (user) {
      let safeUser = {
        id: user.id,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        infoAboutUser: user.infoAboutUser,
      };
      res.status(200).json(safeUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } })
    console.log(password, user)
    const validatedPass = await bcrypt.compare(password, user.password);

    if (!validatedPass) {
      throw new Error("incorrect password");
    }
    req.session.uid = user.id;
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
  try {
    console.log("hello")
    const user = await User.findByPk(id);
    if (!user) return
    let userUpdated = {};
    console.log(req.body)
    if (info.password) {
      const hash = await bcrypt.hash(info.password, 10)
      console.log(hash);
      userUpdated = await user.update({...req.body.info, password: hash});
      console.log("JHieffafea ==> ",userUpdated)
      await user.save()
    } else {
      delete req.body.info.password;
      userUpdated = await user.update({...req.body.info, password: user.password});
      console.log(userUpdated)
    }
    res.status(200).json(userUpdated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
