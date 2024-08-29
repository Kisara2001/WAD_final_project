const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

const resetPasswordController = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token has expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
        }

        // Hash the new password before saving it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password has been updated' });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = resetPasswordController;
