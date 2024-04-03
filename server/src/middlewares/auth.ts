import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const useAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ status: "error", error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    const { _id }: any = jwt.verify(token, process.env.SECRET as string);
    const user_id = await User.findOne({ _id }).select("_id");
    if (!user_id) {
      return res
        .status(401)
        .json({ status: "error", error: "Authentication failed" });
    }
    req.locals = { _id };
    next();
  } catch (error) {
    console.log("ERROR: ", error);
    return res
      .status(500)
      .json({ status: "error", error: "Request is not authorized" });
  }
};
