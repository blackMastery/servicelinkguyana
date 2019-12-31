const catchAsync = require("../utils/catchAsync");
const Client = require('../models/clients');
const User = require('../models/user');

const ServiceProvider = require('../models/serviceProvider');


const AppError = require('../utils/appError')
const jwt = require("jsonwebtoken");





const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    ...user._doc
  });
};

exports.signup = catchAsync(async (req, res, next) => {
    console.log(req.body)
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
    role: req.body.role
  });

//   const url = `${req.protocol}://${req.get("host")}/me`;
  // console.log(url);
//   await new Email(newUser, url).sendWelcome();

//   createSendToken(newUser, 201, req, res);
createSendToken(newUser,200,  res);
// res.status(200).json({
//     client: newClient
// })

});


exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: "success" });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (
    !(await user.correctPassword(req.body.passwordCurrent, user.password))
  ) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200,  res);
});








exports.loginProvider = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const provider = await ServiceProvider.findOne({ email }).select("+password");

  if (!provider || !(await provider.correctPassword(password, provider.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(provider, 200, res);
});


exports.registerProvider = catchAsync(async (req, res, next) => {
  const { firstname, lastname, password, passwordConfirm, email, availability } = req.body;

  const provider = await ServiceProvider.create({
    firstname,
    lastname,
    password,
    passwordConfirm,
    email,
    availability
  });

  /**
   * Todo: email verification
   */

  createSendToken(provider, 200, res);
});



/**
 * build forgot password controller 
 */

 /**
  * buidl reset password controller 
  */