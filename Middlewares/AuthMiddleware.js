const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};

module.exports.cookieToId = (token) => {
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const user = await User.findById("66e93675efb60defa62c2423");
      if (user) return true;
    } catch (error) {
      console.log(error.message);
    }
  });
};
