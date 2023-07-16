const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const { responseHandler } = require("../helpers/common");

exports.requestValidationMiddleware = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errorMessage = validationErrors
        .array()
        .reduce((accumulator, currentValue) => {
          accumulator += `${currentValue.path}: ${currentValue.msg}, `;
          return accumulator;
        }, "");
      return responseHandler(res, 400, false, null, errorMessage);
    }

    next();
  } catch (error) {
    console.error(error);
    return responseHandler(res, 500, false, null);
  }
};

exports.postActivityRequestValidator = [
  body("createdBy")
    .exists()
    .notEmpty()
    .withMessage("Created by is required")
    .isString()
    .withMessage("Property should be a string"),
  body("title")
    .exists()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Property should be a string"),
  body("date").exists().isISO8601().withMessage("Invalid date format received"),
  body("meetingPoint")
    .exists()
    .notEmpty()
    .withMessage("Meeting point is required")
    .isString()
    .withMessage("Property should be a string"),
  body("coordinates")
    .exists()
    .notEmpty()
    .withMessage("Coordinates are required")
    .custom((value) => {
      if (
        !value ||
        typeof value.lat !== "number" ||
        typeof value.lng !== "number"
      ) {
        throw new Error("Invalid coordinates format");
      }
      return true;
    })
    .withMessage("Invalid coordinates format"),
  body("typeOfActivity")
    .exists()
    .notEmpty()
    .withMessage("Type of activity is required")
    .isString()
    .withMessage("Property should be a string"),
  body("aboutActivity")
    .exists()
    .notEmpty()
    .withMessage("About activity is required")
    .isString()
    .withMessage("Property should be a string"),
  body("spots")
    .exists()
    .notEmpty()
    .withMessage("Number of spots is required")
    .isString()
    .withMessage("Property should be a string"),
  body("telegramLink")
    .exists()
    .notEmpty()
    .withMessage("Telegram link is required")
    .isString()
    .withMessage("Property should be a string"),
];

exports.editActivityRequestValidator = [
  body("id")
    .exists()
    .notEmpty()
    .withMessage("Id is required")
    .isInt()
    .withMessage("Property should be an integer"),
  body("info.title")
    .exists()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Property should be a string"),
  body("info.date").exists().isISO8601().withMessage("Invalid date format received"),
  body("info.meetingPoint")
    .exists()
    .notEmpty()
    .withMessage("Meeting point is required")
    .isString()
    .withMessage("Property should be a string"),
  body("info.coordinates")
    .exists()
    .notEmpty()
    .withMessage("Coordinates are required")
    .custom((value) => {
      if (
        !value ||
        typeof value.lat !== "number" ||
        typeof value.lng !== "number"
      ) {
        throw new Error("Invalid coordinates format");
      }
      return true;
    })
    .withMessage("Invalid coordinates format"),
  body("info.typeOfActivity")
    .exists()
    .notEmpty()
    .withMessage("Type of activity is required")
    .isString()
    .withMessage("Property should be a string"),
  body("info.aboutActivity")
    .exists()
    .notEmpty()
    .withMessage("About activity is required")
    .isString()
    .withMessage("Property should be a string"),
  body("info.spots")
    .exists()
    .notEmpty()
    .withMessage("Number of spots is required")
    .isString()
    .withMessage("Property should be a string"),
  body("info.telegramLink")
    .exists()
    .notEmpty()
    .withMessage("Telegram link is required")
    .isString()
    .withMessage("Property should be a string"),
];

exports.joinAndLeaveActivityRequestValidator = [
  body("userId")
    .exists()
    .notEmpty()
    .withMessage("userId is required")
    .isString()
    .withMessage("Property should be a string"),
  body("activityId")
    .exists()
    .notEmpty()
    .withMessage("activityId is required")
    .isInt()
    .withMessage("Property should be an integer"),
];

exports.createUserRequestValidator = [
  body("avatar")
    .optional()
    .isString()
    .withMessage("Property should be a string"),
  body("infoAboutUser")
    .optional()
    .isString()
    .withMessage("Property should be a string"),
  body("firstName")
    .exists()
    .notEmpty()
    .withMessage("firstName is required")
    .isString()
    .withMessage("Property should be a string"),
  body("lastName")
    .exists()
    .notEmpty()
    .withMessage("lastName is required")
    .isString()
    .withMessage("Property should be a string"),
  body("age")
    .exists()
    .notEmpty()
    .withMessage("age is required")
    .isString()
    .withMessage("Property should be a string"),
  body("password")
    .exists()
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("Property should be a string"),
  body("email")
    .exists()
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("Property should be a string"),
];