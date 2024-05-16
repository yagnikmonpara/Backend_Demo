import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "Username, full name, email, and password are required" });
    }

    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username or email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({ username, fullName, email, password: hashedPassword });
    
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in registration", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found. Please register." });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password. Please try again." });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECERET, { expiresIn: '7d' });

    res.status(200).json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in login", error });
  }
};
