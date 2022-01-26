const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


// keep it in secret file like .env.local
const JWT_SECRET = " @df$5";

//Endpoint-1
// Create a user  using: POST "api/auth/createuser" . Doesnt require authentication/login
router.post(
  "/createid",
  [
    // validating data or setting restrictions for user inputs
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // checking errors while taking userinputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //checking if user with same email exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Already a user with this email." });
      }

      //creating salt for password protection
      const salt = await bcrypt.genSalt(10);
      //adding salt with password
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //getting user id to send jwt token as response
      const data = {
        user: {
          id: user.id,
        },
      };

      //signing data with jwt for security 
      const jwtData = jwt.sign(data, JWT_SECRET);
      //sending response as jwt token
      res.json({ jwtData });

    } catch (error) {
      console.error(error.msg);
      res.status(500).send("Internal error occured");
    }
  }
);

//Endpoint - 2
// Authenticating a user using: POST "api/auth/login" . no log in required

router.post(
  "/login",
  [
    // validating data or setting restrictions for user inputs
    body("email", "enter vali mail").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // checking errors while taking userinputs just return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "please give valid credentials" });
      }

      const pasCompare = await bcrypt.compare(password, user.password);
      if (!pasCompare) {
        return res.status(400).json({ error: "please give valid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const jwtData = jwt.sign(data, JWT_SECRET);
      res.json({ jwtData });
    } catch (error) {
      console.error(error.msg);
      res.status(500).send("Internal error occured");
    }
  }
);


//Endpoint-3
// Getting logged in user details  using: POST "api/auth/getuser" .require authentication/login

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.msg);
    res.status(500).send("Internal error occured");
  }
});
module.exports = router;
