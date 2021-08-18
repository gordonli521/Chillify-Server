var express = require("express");
var router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  db.User.find((err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

// GET: use id to get a user
router.get("/:id", (req, res) => {
  let id = req.params.id;
  db.User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(user);
    }
  });
});

// POST: registers a user
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password) {
    errors.push({ msg: "Please fill in all fields" });
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  // Check if passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  db.User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        return res.status(400).json({ msg: "Email is already registered" });
      }

      let newUser = new db.User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser.save().then((result, err) => {
            if (err) {
              console.log(err);
            }
            res.status(200).json({ msg: "success" });
          });
        });
      });
    })
    .catch((err) => console.log(err, "error here"));
});

// GET: gets a user's favorites
router.get("/:id/favorites", (req, res) => {
  let id = req.params.id;
  db.User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(user.favorites);
    }
  });
});

// PUT: updates user favorites
router.put("/:id/favorites", (req, res) => {
  let id = req.params.id;
  db.User.findById(id, (err, user) => {
    if (!user) {
      res.status(404).json("data is not found");
    } else if (user.favorites.includes(req.body.id)) {
      let remove = user.favorites.filter((favId) => {
        return favId.toString() !== req.body.id;
      });
      user.favorites = [...remove];
      user.save().then((result, err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ msg: "favorite successfully removed" });
        return res.status(200).json({ msg: "favorite successfully removed" });
      });
    } else if (req.body.id) {
      user.favorites = [...user.favorites, req.body.id];
      user.save().then((result, err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ msg: "favorite successfully added" });
        return res.status(200).json({ msg: "favorite successfully added" });
      });
    } else {
      res.status(400).json("no id in request body");
    }
  });
});

// DELETE: uses id to delete a user
router.delete("/delete/:id", (req, res) => {
  db.User.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
