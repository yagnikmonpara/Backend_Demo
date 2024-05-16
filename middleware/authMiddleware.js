import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import Admin from '../models/adminModel.js';

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decode;

    if (req.params.userId && req.params.userId !== req.user._id) {
      const targetUser = await userModel.findById(req.params.userId);

      if (!targetUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (targetUser.private && !targetUser.followers.includes(req.user._id)) {
        return res.status(403).json({ success: false, message: 'Access denied to private account' });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};
export const requireAdmin = async (req, res, next) => {
  try {
    // Check if user is an admin
    const admin = await Admin.findOne({ userId: req.user._id });
    if (!admin) {
      return res.status(403).json({ success: false, message: 'Admin privileges required' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error checking admin privileges', error });
  }
};