const Apikey = require('../models/Apikey');
const User = require('../models/User');
const auth = require('../middleware/auth');

module.exports = app => {
  app.post('/api/apikey', auth, async (req, res) => {
    let apikey;
    try {
      apikey = await new Apikey(req.body).save();
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        apikeyId: apikey._id
      });
      res.send(apikey);
    } catch (err) {
      if (apikey !== undefined) {
        try {
          const deletedApikey = await Apikey.findByIdAndRemove(apikey._id);
        } catch (err) {
          res.status(400).send({
            error: {
              message: err.message
            }
          });
        }
      }
      res.status(400).send({
        error: {
          message: err.message
        }
      });
    }
  });

  app.put('/api/apikey', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const updatedApikey = await Apikey.findByIdAndUpdate(
        user.apikeyId,
        req.body,
        { new: true }
      );
      res.send(updatedApikey);
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
  });

  app.delete('/api/apikey', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const deletedApikey = await Apikey.findByIdAndRemove(user.apikeyId);
      const deletedUser = await User.findByIdAndUpdate(req.user._id, {
        $unset: { apikeyId: 1 }
      });
      res.send(deletedApikey);
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
  });

  // // DON'T OPEN IN PUBLIC FOR SECURITY
  // app.get('/api/apikey', auth, async (req, res) => {
  //   try {
  //     const user = await User.findById(req.user._id);
  //     const apykey = await Apikey.findById(user.apikeyId);
  //     if (!user || !apykey) {
  //       res.status(404).json({
  //         errors: {
  //           route: {
  //             msg: 'Not the apikey data found.'
  //           }
  //         }
  //       });
  //     }
  //     res.send(apykey);
  //   } catch (err) {
  //     res.status(400).send({
  //       error: {
  //         message: err.message
  //       }
  //     });
  //   }
  // });
};
