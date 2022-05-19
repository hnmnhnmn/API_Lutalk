const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }
  try {
      const decode = jwt.verify(token,'very good security');
      req.userId = decode.userId;
      next();
  } catch(err) {
      console.log(err);
      return res.status(403).json({success: false, message: error});
  }
};

module.exports = verifyToken;