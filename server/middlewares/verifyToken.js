const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user; //req.user can be anything req.profile, req.account...

      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAnAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed this operation");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json("You are not an Admin,you are not allowed to do this operation");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAnAuthorization,
  verifyTokenAndAdmin,
};
