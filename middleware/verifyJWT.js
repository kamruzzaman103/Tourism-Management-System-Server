// const jwt = require('jsonwebtoken');

// const verifyJWT = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).send({ message: 'Unauthorized' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).send({ message: 'Forbidden' });
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = verifyJWT;

const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized: No token' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Forbidden: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;

