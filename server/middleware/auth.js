const User = require("./../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;

    console.log("Auth console.logs ", req.session, req.session.uid);

    if (!uid) {
      throw new Error("No session uid");
    }

    const user = await User.findOne({ where: { id: uid } });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
