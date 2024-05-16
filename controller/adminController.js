import User from '../models/userModel.js';
import Admin from '../models/adminModel.js';

// Create admin controller
export const createAdmin = async (req, res) => {
    try {
        const { userId } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user is already an admin
        const existingAdmin = await Admin.findOne({ userId });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'User is already an admin' });
        }

        // Create admin entry
        const admin = new Admin({ userId });
        await admin.save();

        // Set isAdmin field to true in the user document
        user.isAdmin = true;
        await user.save();

        res.status(201).json({ success: true, message: 'Admin created successfully', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating admin', error });
    }
};

// Remove admin controller
export const removeAdmin = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user is an admin
        const admin = await Admin.findOne({ userId });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'User is not an admin' });
        }

        // Remove admin entry
        await admin.remove();

        // Set isAdmin field to false in the user document
        user.isAdmin = false;
        await user.save();

        res.status(200).json({ success: true, message: 'Admin removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error removing admin', error });
    }
};