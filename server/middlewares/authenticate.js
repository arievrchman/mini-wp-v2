const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.token;
  if (!token) {
    res.status(401).json({ message: 'you must login first!' });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(400).json(err.message);
      } else {
        console.log(decoded);
        req.auth_user = decoded;
        next();
      }
    });
  }
};