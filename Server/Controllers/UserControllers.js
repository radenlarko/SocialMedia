import UserModel from "../Models/userModel.js";

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
