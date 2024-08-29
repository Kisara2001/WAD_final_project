const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

// userSignIn
const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error('Please provide email');
    }
    if (!password) {
      throw new Error('Please provide password');
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '8h',
      });

      const tokenOption = {
        httpOnly: true,
        secure: false,
      };

      res.cookie('token', token, tokenOption).status(200).json({
        message: 'Login successful',
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error('Invalid password');
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignInController;
