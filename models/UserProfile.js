const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    unique: true,
  },
  firstName: String,
  lastName: String,
  // Add other profile fields as needed
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
