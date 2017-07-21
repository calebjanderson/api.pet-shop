const uuid = require('uuid/v4');

const sessionMap = {};
const userMap = {};

exports.newError = (message, status) => {
  const error = new Error(message);
  error.status = status || 500;
  return error;
};

exports.addSession = (userId) => {
  if (userMap[userId]) {
    return userMap[userId];
  } else {
    const apiToken = uuid();
    sessionMap[apiToken] = userId;
    userMap[userId] = apiToken;
    return apiToken;
  }
};

exports.protect = (req, res, next) => {
  const userId = sessionMap[req.get('Authorization')];

  if (userId === undefined) {
    next(exports.newError('Invalid apiToken.', 401));
  } else {
    req.userId = userId;
    next();
  }
};
