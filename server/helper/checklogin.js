import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const config = dotenv.config();
const {
  SECRET
} = config.parsed;
const checkLogin = (req, res, next) => {
  const token = req.body.token || req.headers['user-token'];

  // Check if token is sent
  if (token) {
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        res.status(401).send({
          success: false,
          message: 'User authentication failed'
        });
        return;
      }
      req.userType = decoded.usertype;
      req.accountType = decoded.accounttype;
      req.email = decoded.email;
      req.username = decoded.username;
      return next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'User token is not provided'
    });
  }
};

export default checkLogin;
