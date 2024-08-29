const userModel = require('../../models/userModel');

const editProfileController = async (req, res) => {
    try {
        const { userId, name, telephone, address, profession, profilePic } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user profile fields
        user.name = name || user.name;
        user.telephone = telephone || user.telephone;
        user.address = address || user.address;
        user.profession = profession || user.profession;
        user.profilePic = profilePic || user.profilePic;

        // Save the updated user profile
        await user.save();

        res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = editProfileController;
