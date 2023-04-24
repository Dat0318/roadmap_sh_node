import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { users } from './../common/constance.js';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const register = async (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find((user) => user.username === username); // Check if the user already exists
  if (userExists) {
    return res.status(400).send('User already exists');
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS)); // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = { username, password: hashedPassword }; // Store the user
  users.push(newUser);

  res.status(201).send('User registered successfully');
};

const authenticate = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username); // Find the user
  if (!user) {
    return res.status(404).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); // Verify the password
  if (!isPasswordValid) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET); // Create a JWT

  res.status(200).json({ token });
};

async function forgotPassword(req, res) {
  // Find the user by email
  const user = users.filter(({email}) => email === req.body.email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Generate a password reset token and set its expiration date
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  // await user.save();

  // Send the password reset email
  const resetUrl = `http://${req.headers.host}/auth/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Failed to send password reset email:', err);
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
}

async function resetPassword(req, res) {
  // Validate the password reset token
  const token = req.query.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // Find the user by their ID and token, and check if the token is still valid
  // const user = users.filter({
  //   _id: decodedToken.id,
  //   passwordResetToken: token,
  //   passwordResetExpires: { $gt: Date.now() },
  // });

  const user = {};

  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired password reset token' });
  }

  // Update the user's password and remove the reset token and its expiration date
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // await user.save();

  // Send a confirmation email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset Confirmation',
    html: `
      <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Failed to send password reset confirmation email:', err);
    res.status(500).json({ error: 'Failed to send password reset confirmation email' });
  }
}
export default {
  register,
  authenticate,
  forgotPassword,
  resetPassword
};
