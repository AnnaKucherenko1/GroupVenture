const { UNEXPECTED_ERROR_MESSAGE } = require("../constants")

exports.responseHandler = (res, status, success, data, message) =>
  res.status(status).json({ success, data, message: !!message ? message : UNEXPECTED_ERROR_MESSAGE });
