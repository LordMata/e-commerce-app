const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUserByEmail } = require('../models/userModel');

// Configure local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // The field used to log in
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id); // Assume this is a function to get user by ID
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
