const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../../models/userModel');

const forgotPasswordController = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USERNAME,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${process.env.FRONTEND_URL}/reset-password/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Recovery email sent' });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = forgotPasswordController;
