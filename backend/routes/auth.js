const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const dotenv = require('dotenv');
dotenv.config();
const { body, validationResult } = require("express-validator");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

//Router 1:  create a user using : POST "/api/auth/createuser" No login required
router.post(
  "/createuser",

  //Validation
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter password at least 5 digit").isLength({ min: 5 }),
  body("name").isLength({ min: 5 }),

  async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      //check whether the email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const srcPassword = bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        email: req.body.email,
        password: srcPassword,
        name: req.body.name,
      });

      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //     res.send({
      //       err: "please enter the unique value of email",
      //       mesage: err.mesage,
      //     });
      //   });
      // res.send(req.body);
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error( success, error.message);
      res.status(500).send(success, "some error occured");
    }
  }
);

//Router 2:  login a user using : POST "/api/auth/login" No login required
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password can not be blank").exists(),
  async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "try to login with correct credential" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "try to login with correct credential" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = "true"
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }

    // console.log(req.body);

   
  }
);

 // Router 3: Get loggedin user Details using: POST "/api/auth/getuser". Login required

 router.post('/getuser',fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
 })

module.exports = router;
