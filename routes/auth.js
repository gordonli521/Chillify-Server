// require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");

// login
router.post("/login", (req, res) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || !password) {
    errors.push({ msg: "Missing email or password" });
    return res.status(400).json({ msg: "Missing email or password" });
  }

  db.User.findOne({ email }).then(async (user) => {
    if (!user) {
      errors.push({ msg: "User does not exist" });
      return res.status(400).json({ msg: "User does not exist" });
    }
    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        errors.push({ msg: "Incorrect password" });
        console.log("password does not match");
        return res.status(400).json({ msg: "Incorrect password" });
      }

      jwt.sign(
        { id: user._id },
        config.get("ACCESS_TOKEN_SECRET"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

router.get("/user", auth, (req, res) => {
  db.User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
