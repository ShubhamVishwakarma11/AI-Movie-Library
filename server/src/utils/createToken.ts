import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const createToken = (_id: ObjectId) => {
  return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: "1d" });
};
