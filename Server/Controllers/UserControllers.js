import bcrypt from "bcrypt";
import UserModel from "../Models/userModel.js";

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
  const {
    currentUserId,
    currentUserAdminStatus,
    password: passBody,
  } = req.body;

  try {
    if (id === currentUserId || currentUserAdminStatus) {
      if (passBody) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(passBody, salt);
        req.body.password = hashedPass;
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const { password, ...rest } = user._doc;
      return res.status(200).json({ success: true, data: rest });
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
  const { currentUserId } = req.body;

  try {
    if (id !== currentUserId) {
      const follow = await UserModel.findById(id);
      const following = await UserModel.findById(currentUserId);

      if (!follow.followers.includes(currentUserId)) {
        await follow.updateOne({ $push: { followers: currentUserId } });
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
  const { currentUserId } = req.body;

  try {
    if (id !== currentUserId) {
      const follow = await UserModel.findById(id);
      const following = await UserModel.findById(currentUserId);

      if (follow.followers.includes(currentUserId)) {
        await follow.updateOne({ $pull: { followers: currentUserId } });
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
