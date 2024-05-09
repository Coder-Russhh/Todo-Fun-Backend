const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// dotenv config--
dotenv.config();

// for registering a user--
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ error: "Already Email exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// for login --
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    //
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update your profile--
const updateUser = async (req, res) => {
  const { username, email, password, newPassword } = req.body;

  try {
    // Ensure the user is authenticated and the user object is available in the request
    const userId = req.user.userId; // Assuming you store user ID in the JWT token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    if (username) {
      user.username = username;
    }

    if (email) {
      // Check if the new email is not already taken by another user
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== userId) {
        return res.status(409).json({ error: "Email already exists" });
      }
      user.email = email;
    }

    // Update password if newPassword is provided
    if (newPassword) {
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout from website
const logoutUser = async (req, res) => {
    res.json({ message: 'Logout successful', clearToken: true });
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
};
