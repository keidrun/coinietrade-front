const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys').get(process.env.NODE_ENV);
const axios = require('axios');

const User = require('../models/User');

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
      callbackURL: '/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ 'facebook.id': profile.id })
        .then(existingUser => {
          if (existingUser) {
            // Login
            existingUser.generateToken((err, user) => {
              if (err) return done(err);

              done(null, existingUser);
            });
          } else {
            // Sign up
            const facebookId = profile.id;
            const profilePictureURL = `https://graph.facebook.com/${facebookId}/picture?type=square`;
            new User({
              displayName: profile.displayName,
              familyName: profile.name.familyName,
              givenName: profile.name.givenName,
              middleName: profile.name.middleName,
              email: profile.email,
              avatarUrl: profile.profileUrl || profilePictureURL,
              gender: profile.gender,
              facebook: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                id: facebookId,
                displayName: profile.displayName,
                name: {
                  familyName: profile.name.familyName,
                  givenName: profile.name.givenName,
                  middleName: profile.name.middleName
                },
                email: profile.email,
                avatarUrl: profile.profileUrl,
                gender: profile.gender
              }
            })
              .save()
              .then(user => {
                user.generateToken((err, user) => {
                  if (err) return done(err);

                  done(null, user);
                });
              });
          }
        })
        .catch(err => done(err));
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ 'google.id': profile.id })
        .then(existingUser => {
          if (existingUser) {
            // Login
            existingUser.generateToken((err, user) => {
              if (err) return done(err);

              done(null, existingUser);
            });
          } else {
            // Sign up
            new User({
              displayName: profile.displayName,
              familyName: profile.name.familyName,
              givenName: profile.name.givenName,
              email: profile.emails[0].value,
              avatarUrl: profile.photos[0].value,
              gender: profile.gender,
              language: profile.language,
              google: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                id: profile.id,
                displayName: profile.displayName,
                name: {
                  familyName: profile.name.familyName,
                  givenName: profile.name.givenName
                },
                email: profile.emails[0].value,
                avatarUrl: profile.photos[0].value,
                gender: profile.gender,
                language: profile.language
              }
            })
              .save()
              .then(user => {
                user.generateToken((err, user) => {
                  if (err) return done(err);

                  done(null, user);
                });
              });
          }
        })
        .catch(err => done(err));
    }
  )
);
