const uuid = require('uuid');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys').get(process.env.NODE_ENV);
const { User } = require('../models');
const { BackendApiClient } = require('../utils/clients');

const proxyURL = process.env.PROXY_URL || keys.proxyURL || '';
const apiClient = new BackendApiClient();

// const serializeUser = () =>
//   passport.serializeUser((user, done) => done(null, user._id));

// const deserializeUser = () =>
//   passport.deserializeUser(async (_id, done) => {
//     try {
//       const user = await User.findById(_id);
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   });

const configureStrategy = {
  withFacebook: () =>
    passport.use(
      new FacebookStrategy(
        {
          clientID: keys.facebookClientId,
          clientSecret: keys.facebookClientSecret,
          callbackURL: `${proxyURL}/auth/facebook/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          if (!profile) {
            return done(null, false);
          }

          try {
            const user = await User.findOne({ 'authProvider.id': profile.id });
            if (user) {
              // Login
              const loggedinUser = await user.generateToken();
              return done(null, loggedinUser);
            }

            // Add policy to backend
            const userId = uuid.v4();
            await apiClient.addPolicy({
              userId,
            });

            // Sign up
            const facebookId = profile.id;
            const profilePictureURL = `https://graph.facebook.com/${facebookId}/picture?type=square`;
            const newUser = await new User({
              _id: userId,
              displayName: profile.displayName,
              familyName: profile.name.familyName,
              givenName: profile.name.givenName,
              middleName: profile.name.middleName,
              email: profile.email,
              avatarUrl: profile.profileUrl || profilePictureURL,
              gender: profile.gender,
              authProvider: {
                name: 'facebook',
                id: facebookId,
                accessToken,
                refreshToken,
              },
            }).save();

            const signedupUser = await newUser.generateToken();
            return done(null, signedupUser);
          } catch (error) {
            return done(error);
          }
        },
      ),
    ),
  withGoogle: () =>
    passport.use(
      new GoogleStrategy(
        {
          clientID: keys.googleClientId,
          clientSecret: keys.googleClientSecret,
          callbackURL: `${proxyURL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          if (!profile) {
            return done(null, false);
          }

          try {
            const user = await User.findOne({ 'authProvider.id': profile.id });
            if (user) {
              // Login
              const loggedinUser = await user.generateToken();
              return done(null, loggedinUser);
            }

            // Add policy to backend
            const userId = uuid.v4();
            await apiClient.addPolicy({
              userId,
            });

            // Sign up
            const newUser = await new User({
              _id: userId,
              displayName: profile.displayName,
              familyName: profile.name.familyName,
              givenName: profile.name.givenName,
              email: profile.emails[0].value,
              avatarUrl: profile.photos[0].value,
              gender: profile.gender,
              language: profile.language,
              authProvider: {
                name: 'google',
                id: profile.id,
                accessToken,
                refreshToken,
              },
            }).save();

            const signedupUser = await newUser.generateToken();
            return done(null, signedupUser);
          } catch (error) {
            return done(error);
          }
        },
      ),
    ),
};

const initialize = () => {
  // serializeUser();
  // deserializeUser();
  configureStrategy.withFacebook();
  configureStrategy.withGoogle();
  return passport.initialize();
};

const authenticate = {
  withFacebook: () =>
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'],
      session: false,
    }),
  withGoogle: () =>
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
    }),
};

module.exports = { initialize, authenticate };
