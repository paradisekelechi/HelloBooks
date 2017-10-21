
const checkUser = (req, res, next) => {
  const { userType } = req;
  const { username } = req;
  const { email } = req;
  // Check if usertype exists
  if (userType) {
    if (userType !== 2) {
      res.status(401).send({
        status: false,
        message: 'Oops! User not authorized'
      });
      return;
    }
    req.userType = 'ADMIN';
    req.username = username;
    req.email = email;
    return next();
  }
  res.status(400).send({
    status: false,
    message: 'User type is not available'
  });
};

export default checkUser;
