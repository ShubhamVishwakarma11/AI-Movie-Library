import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/userModel";
import { createToken } from "../utils/createToken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res
        .status(500)
        .json({ status: "error", error: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ status: "error", error: "No user with that email!" });
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      return res.status(500).json({ status: "error", error: "Wrong password" });
    }

    const token = createToken(user._id);

    return res.status(200).json({ status: "success", data: { token } });
  } catch (error) {
    return res.status(500).json({ status: "error", error: "Signup Failed" });
  }
};

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // validation
    if (!email || !password || !confirmPassword) {
      return res
        .status(500)
        .json({ status: "error", error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(500)
        .json({ status: "error", error: "Enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(500)
        .json({ status: "error", error: "Password is not strong enough" });
    }

    if (password !== confirmPassword) {
      return res.status(500).json({
        status: "error",
        error: `Make sure 'Confirm Password' is same as 'Password' `,
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res
        .status(500)
        .json({ status: "error", error: "Email already in use!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash, favourites: [] });

    console.log("USER", user);

    const token = createToken(user._id);

    return res.status(200).json({ status: "success", data: { token } });
  } catch (err) {
    console.error("ERROR", err);
    return res.status(500).json({ status: "error", error: "Signup Failed!" });
  }
};
