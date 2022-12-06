import bcrypt from "bcrypt";
import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    const mapUser = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    return res.status(200).json({ success: true, data: mapUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get a user
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...rest } = user._doc;
      return res.status(200).json(rest);
    }

    return res.status(404).json({ message: "User does not exist!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, currentUserAdminStatus, password: passBody } = req.body;

  try {
    if (id === _id || currentUserAdminStatus) {
      if (passBody) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(passBody, salt);
        req.body.password = hashedPass;
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const { password, ...rest } = user._doc;
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ success: true, user: rest, token });
    }

    return res.status(403).json({
      success: false,
      message: "Access denied! you can only update your own profile!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId, currentUserAdminStatus } = req.body;

  try {
    if (id === currentUserId || currentUserAdminStatus) {
      await UserModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    }

    return res.status(403).json({
      success: false,
      message: "Access denied! you can only delete your own profile!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// follow user
export const followUser = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.body;

  try {
    if (id !== _id) {
      const follow = await UserModel.findById(id);
      const following = await UserModel.findById(_id);

      if (!follow.followers.includes(_id)) {
        await follow.updateOne({ $push: { followers: _id } });
        await following.updateOne({ $push: { followings: id } });
        return res
          .status(200)
          .json({ success: true, message: "User Followed" });
      }

      return res
        .status(403)
        .json({ success: false, message: "User is Already followed by you!" });
    }

    return res.status(403).json({
      success: false,
      message: "Action Forbiden",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// unfollow user
export const unFollowUser = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.body;

  try {
    if (id !== _id) {
      const follow = await UserModel.findById(id);
      const following = await UserModel.findById(_id);

      if (follow.followers.includes(_id)) {
        await follow.updateOne({ $pull: { followers: _id } });
        await following.updateOne({ $pull: { followings: id } });
        return res
          .status(200)
          .json({ success: true, message: "User Unfollowed" });
      }

      return res
        .status(403)
        .json({ success: false, message: "User is not followed by you!" });
    }

    return res.status(403).json({
      success: false,
      message: "Action Forbiden",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
