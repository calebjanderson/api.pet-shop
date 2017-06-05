const uuid = require('uuid/v4');

const currentSession = {};

// clear session every day to prevent memory leak
setInterval(() => {
  currentSession = {};
}, 3600000 * 24); // 3.6e+6 ms in an hour

exports.addSession = userId => {
  const apiToken = uuid();
  currentSession[apiToken] = userId;
  console.warn('User Session Added')
  console.warn('userId: ', userId);
  console.warn('apiToken: ', apiToken);
  return apiToken;
};

exports.protect = (req, res, next)  => {
  const apiToken = req.get('Authorization');

  if (!currentSession[apiToken]) {
    console.log('Invalid apiToken: ', apiToken);
    return next(new Error('Invalid apiToken'));
  }

  console.log('Authentication Successful: ', apiToken);
  req.userId = currentSession[apiToken];
  next();
};
