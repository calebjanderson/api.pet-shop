const uuid = require('uuid/v4');

const currentSession = {};

exports.addSession = userId => {
  const apiToken = uuid();
  currentSession[apiToken] = userId;
  return apiToken;
};

exports.protect = (req, res, next)  => {
  const apiToken = req.get('Authorization');

  if (!currentSession[apiToken]) {
    return next(new Error('Invalid apiToken'));
  }

  req.userId = currentSession[apiToken];
  next();
};
