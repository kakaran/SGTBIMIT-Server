const JWT  = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
   await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      (err,auth) =>{
        if(auth) {
          next()}

      }
    );
     } catch (error) {
    console.log(error);
  }
};

module.exports = requireSignIn;