const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const User = require('../models/user');


const getUsers = async (req, res, next ) => {
  
  let users;
  try {
    users = await User.find({}, '-password');
  } catch(err) {
    const error = new HttpError('Fetching failed, please try again later', 500);
    return next(error);
  }

  res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next ) => {

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, check your data", 422)); 
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
   existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Signing up failed. Please try again', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User exists already', 422);
    return next(error);
  }
    const createdUser = new User({
        name,
        email,
        image:'https://scontent-mad1-1.xx.fbcdn.net/v/t31.0-8/p720x720/20934676_10210510378011286_4572010757152615500_o.jpg?_nc_cat=106&_nc_oc=AQnNjsfN9lMtti3S5G8jopiRy33whXPA6wMKMtjRwd_AUmGHD8ghxDxsoVv55-dOduE&_nc_ht=scontent-mad1-1.xx&_nc_tp=1002&oh=65d6ce502110d06b4b98ba0e3a49b1bc&oe=5E9B4BFD',
        password,
        places: []
    });

    try {
      await createdUser.save(); 
    } catch (err) {
      const error = new HttpError('Signing up failed, try again', 500);
      console.log(err);
      return next(error);
    }

    res.status(201).json({user: createdUser.toObject( { getters: true } )});
};

const login = async (req, res, next ) => {
    const { email, password } = req.body;

    let existingUser;

    try {
     existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError('Logging in failed. Please try again', 500);
      return next(error);
    }
    
    if(!existingUser || existingUser.password !== password ) {
      const error = new HttpError('Invalid credentials, could not log you in', 401);
      return next(error);
    }

    res.json({
      message: "Logged in",
      user: existingUser.toObject({ getters: true }),
    });
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;