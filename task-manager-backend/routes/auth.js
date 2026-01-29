const router = require("express").Router();
const User = require("../models/User");

// REGISTER API
router.post("/register", async (req, res) => {
  try {
    // 1. Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // 2. Save to MongoDB
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error creating user. Username or Email might be taken.",
    });
  }
});

// LOGIN API
router.post("/login", async (req, res) => {
  try {
    // 1. Find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("User not found!");

    // 2. Check password (Simple check for demo; use bcrypt in production)
    if (user.password !== req.body.password) {
      return res.status(400).json("Wrong password!");
    }

    // 3. Return user info
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
