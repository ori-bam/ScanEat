const jwt = require("jsonwebtoken");

const tokenKey = process.env.JWT_KEY;

function createToken(user) {
  // Container
  const container = { user };

  // Options
  const options = { expiresIn: "1h" };

  // The token
  const token = jwt.sign(container, tokenKey, options);
  return token;
}


function checkAuth (req, res, next) {
  try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token)
 
      jwt.verify(token, process.env.JWT_KEY);
      next();
  } catch (error) {
      res.status(401).json({
          message: 'Auth failed'
      })
  }
}
function checkAdminAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log("hiiiiiiiiiiiiiii")
    //console.log(decodedToken)
    console.log(decodedToken.user)
    const authLevel = decodedToken.authLevel;

    if (authLevel !== 'admin') {
      res.status(401).json({
        message: 'Access denied'
      });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed'
    });
  }
}









module.exports = {
  createToken,
  checkAuth,
  checkAdminAuth
};
