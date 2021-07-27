const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./secrets");
const db = require("../users/users-model");
const { check, validationResult } = require("express-validator");

async function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (!token || token === undefined || token === "") {
    return next({ status: 401, message: "token required" });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: `token invalid` });
    }
    req.decodedJwt = decodedToken;
    next();
  });
}

// const registerSchema = [
//   check('username', 'Username must be at least 6 characters')
//     .isLength({ min: 6 })
//     .trim()
//     .escape(),
//   check('password')
//     .matches(
//       /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
//     )
//     .withMessage(
//       'Password must contain at least 8 characters, one uppercase, one number and one special case character'
//     )
//     .trim()
//     .escape(),
//   check('email', 'Invalid Email').isEmail().trim().escape(),
// ];

function checkLoginPayload(req, res, next) {
  const { username, password } = req.body;

  if (
    username === undefined ||
    username.trim() === "" ||
    password === undefined ||
    password.trim() === "" 
  ) {
    res
      .status(400)
      .json({ message: "username and password  are required" });
  } else if (username.trim().length < 3 || username.trim().length > 25) {
    next({
      status: 400,
      message: "username must be between 3 and 25 chars",
    });
  } else if (password.trim().length < 8 || password.trim().length > 25) {
    next({
      status: 400,
      message: "password must be between 8 and 25 chars",
    });
  } else {
    req.user = {
      // ...req.body,
      username: username.trim(),
      password: password.trim(),

    };
    next();
  }
}

//must exist already in the `users` table
async function checkUserIdExists(req, res, next) {
  try {
    const users = await db.findByUserId(req.params.user_id);
    if (users !== undefined) {
      req.user = users[0];
      next();
    } else {
      next({
        status: 401,
        message: `Given user_id:${req.params.user_id} does not exists in the users table`,
      });
    }
  } catch (err) {
    next(err);
  }
}

//must not exist already in the `users` table
async function checkUsernameExists(req, res, next) {
  try {
    const users = await db.findByUsername({ username: req.body.username });
    if (users.length) {
      req.user = users[0];
      next();
    } else {
      next({
        status: 401,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    next(err);
  }
}

// On FAILED registration due to `username` or `password` missing from the request body,
// the response body should include a string exactly as follows: "username and password required".
function checkPayload(req, res, next) {
  const { username, password, user_phone } = req.body;

  if (
    username === undefined ||
    username.trim() === "" ||
    password === undefined ||
    password.trim() === "" ||
    user_phone === undefined ||
    user_phone.trim() === ""
  ) {
    res
      .status(400)
      .json({ message: "username, password and phone are required" });
  } else if (username.trim().length < 3 || username.trim().length > 25) {
    next({
      status: 400,
      message: "username must be between 3 and 25 chars",
    });
  } else if (password.trim().length < 8 || password.trim().length > 25) {
    next({
      status: 400,
      message: "password must be between 8 and 25 chars",
    });
  } else if (user_phone.trim().length < 12 || user_phone.trim().length > 12 ) {
    next({
      status: 400,
      message:
        "phone number must be between 12 chars in length in the format ###-###-####",
    });
  } else {
    req.user = {
      // ...req.body,
      username: username.trim(),
      password: password.trim(),
      user_phone: user_phone.trim(),
    };
    next();
  }
}
function checkUserEdit(req, res, next) {
  const { username,  user_phone } = req.body;
  if(req.body.user_id || req.body.password){
    {
      res
        .status(400)
        .json({ message: "user can not update user_id or password" });
    } 
  }
  if (
    username === undefined ||
    username.trim() === "" ||
    user_phone === undefined ||
    user_phone.trim() === ""
  ) {
    res
      .status(400)
      .json({ message: "username and phone are required" });
  } else if (username.trim().length < 3 || username.trim().length > 25) {
    next({
      status: 400,
      message: "username must be between 3 and 25 chars",
    });
  } else if (user_phone.trim().length < 12 || user_phone.trim().length > 12 ) {
    next({
      status: 400,
      message:
        "phone number must be between 12 chars in length in the format ###-###-####",
    });
  } else {
    req.user = {
      username: username.trim(),
      user_phone: user_phone.trim(),
    };
    next();
  }
}
//On FAILED registration due to the `username` being taken,
async function checkUsernameFree(req, res, next) {
  try {
    const users = await db.findByUsername({ username: req.body.username }); //as good as passing where("username", username)
    if (!users.length) {
      next();
    } else {
      next({ status: 422, message: "username taken" });
    }
  } catch (err) {
    //try
    next(err);
  }
}

async function checkUserPhoneExists(req, res, next) {
  try {
    const users = await db.findByPhone(req.body.user_phone);
    if (users === undefined) {
      next();
    } else {
      next({
        status: 422,
        message: "Phone number already exists",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  restricted,
  checkUserIdExists,
  checkPayload,
  checkLoginPayload,
  checkUserEdit,
  checkUsernameExists,
  checkUsernameFree,
  checkUserPhoneExists,
};
