import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // change to dotenv.config() for production and setup .env file
const secret = process.env.JWT_KEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;
