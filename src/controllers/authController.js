const User = require('../models/user');


exports.SignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    //check if user already signed in
    const authToken = req.header.accessToken;
    if (authToken) {
      return res.status(401).json({ message: 'User Already Signed in.' });
    }
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate and return a JWT token
    const accessToken = await user.generateAuthToken();
    //const refreshToken = await user.generateRefreshToken();

    res.json({ accessToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
}