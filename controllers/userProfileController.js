const UserProfile = require('../models/UserProfile');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId from the token
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName } = req.body;

    const userProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { firstName, lastName },
      { new: true, upsert: true }
    );

    res.json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
