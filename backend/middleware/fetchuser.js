const jwt = require("jsonwebtoken");


  const JWT_SECRET=process.env.JWT_SECRET

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.send(401).json({
      error: "please authenticate using a valid token",
    });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.send(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
