import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { inMemoryStore } from "../repository/inMemoryStore.js";
import { isMongoAvailable } from "../config/db.js";
import { User } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "netmorph_super_secret_jwt_key_2026_5g_secure";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "USER", organization = "NetMorph Enterprise Client" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
        errorCode: "VALIDATION_ERROR"
      });
    }

    let existingUser = null;
    if (isMongoAvailable) {
      existingUser = await User.findOne({ email });
    } else {
      existingUser = inMemoryStore.findUserByEmail(email);
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email address already exists.",
        errorCode: "EMAIL_EXISTS"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    if (isMongoAvailable) {
      newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        organization
      });
    } else {
      newUser = inMemoryStore.createUser({
        name,
        email,
        password: hashedPassword,
        role,
        organization
      });
    }

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      data: {
        token,
        user: {
          id: newUser.id || newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          organization: newUser.organization
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
        errorCode: "VALIDATION_ERROR"
      });
    }

    let user = null;
    if (isMongoAvailable) {
      user = await User.findOne({ email });
    } else {
      user = inMemoryStore.findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        errorCode: "INVALID_CREDENTIALS"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        errorCode: "INVALID_CREDENTIALS"
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful.",
      data: {
        token,
        user: {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: { user: req.user }
    });
  } catch (err) {
    next(err);
  }
};
