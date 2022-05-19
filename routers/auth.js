const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const User = require("../models/User");

//sign up
router.post("/signup", async (req, res) => {
  const { username, password, password_confirm } = req.body;
  if (!username || !password || !password_confirm) {
    return res.status(400).json({ success: false, message: "enter empty " });
  }

  if (password !== password_confirm) {
    return res
      .status(400)
      .json({ success: false, message: "password confirm incorrect" });
  }

  try {
    const userByUsername = await User.findOne({ username });

    if (userByUsername) {
      return res.status(200).json({ success: false, message: "user exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      "very good sercurity"
    );
    res.status(500).json({ success: true, accessToken });
  } catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});
//sign in
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "enter empty" });
  }
  try {
    const user = User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "username incorrect" });
    }
    const passwordValid = await bcrypt.compare(password,user.password);
    if(!passwordValid) {
        return res.status(400).json({success: false, message:"password incorrect"});
    }
    const accessToken = jwt.sign(
        {userId: user._id},
        'very good sercurity'
    );
    res.json({success: true , accessToken});
  } catch (error) {
      return res.status(400).json({success: false, message:error.toString()});
  }
});
module.exports = router;