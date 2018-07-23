const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const proxyURL = process.env.PROXY_URL || keys.proxyURL || '';

const { User } = require('../models/User');
const { BackendApiClient } = require('../utils/BackendApiClient');

const apiClient = new BackendApiClient();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id).then(user => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientId,
      clientSecret: keys.facebookClientSecret,
      callbackURL: `${proxyURL}/auth/facebook/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ 'facebook.id': profile.id });
        if (user) {
          // Login
          const passedUser = await user.generateToken();
          done(null, passedUser);
        } else {
          // Sign up
          const facebookId = profile.id;
          const profilePictureURL = `https://graph.facebook.com/${facebookId}/picture?type=square`;
          const newUser = await new User({
            displayName: profile.displayName,
            familyName: profile.name.familyName,
            givenName: profile.name.givenName,
            middleName: profile.name.middleName,
            email: profile.email,
            avatarUrl: profile.profileUrl || profilePictureURL,
            gender: profile.gender,
            facebook: {
              accessToken,
              refreshToken,
              id: facebookId,
            },
          }).save();

          // Add Policy
          await apiClient.addPolicy({
            userId: newUser._id,
          });

          const passedUser = await newUser.generateToken();
          done(null, passedUser);
        }
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: `${proxyURL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ 'google.id': profile.id });
        if (user) {
          // Login
          const passedUser = await user.generateToken();
          done(null, passedUser);
        } else {
          // Sign up
          const newUser = await new User({
            displayName: profile.displayName,
            familyName: profile.name.familyName,
            givenName: profile.name.givenName,
            email: profile.emails[0].value,
            avatarUrl: profile.photos[0].value,
            gender: profile.gender,
            language: profile.language,
            google: {
              accessToken,
              refreshToken,
              id: profile.id,
            },
          }).save();

          // Add Policy
          await apiClient.addPolicy({
            userId: newUser._id,
          });

          const passedUser = await newUser.generateToken();
          done(null, passedUser);
        }
      } catch (err) {
        done(err);
      }
    },
  ),
);
