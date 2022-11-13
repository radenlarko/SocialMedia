import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

// Registering a new user
export const registerUser = async (req, res) => {
  const { username, password: passBody, firstname, lastname } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(passBody, salt);

  const newUser = new UserModel({
    username,
    password: hashedPass,
    firstname,
    lastname,
  });

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res
        .status(403)
        .json({ success: false, message: "user is already registered" });
    }

    await newUser.save();
    const { password, ...rest } = newUser._doc;
    return res.status(200).json({ success: true, data: rest });
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

      const validate = validity
        ? res.status(200).json(rest)
        : res.status(400).json({ message: "wrong password" });
      return validate;
    }

    return res.status(404).json({ message: "User does not exist!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
