const express = require("express");
const router = express.Router();
const User = require('../../models/userModel')

// route to check if a user is an admin
router.get('/userIsAdmin/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isAdmin = user.isAdmin;
    return res.status(200).json({ isAdmin });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
