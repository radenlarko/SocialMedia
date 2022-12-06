import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // change to dotenv.config() for production and setup .env file

// Registering a new user
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);

  const { username } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) {
      return res
        .status(403)
        .json({ success: false, message: "User is already registered!" });
    }

    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    const { password, ...rest } = newUser._doc;
    return res.status(200).json({ success: true, user: rest, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { username, password: passBody } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const { password, ...rest } = user._doc;
      const validity = await bcrypt.compare(passBody, user.password);

      if (!validity) {
        return res
          .status(400)
          .json({ success: false, message: "wrong password" });
      }

      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ success: true, user: rest, token });
    }

    return res.status(404).json({ message: "User does not exist!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
