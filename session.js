const uuid = require('uuid/v4');

const sessionMap = {};
const userMap = {};

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

  if (!userId) {
    next(new Error('Invalid apiToken'));
  } else {
    req.userId = userId;
    next();
  }
};
