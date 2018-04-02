const Apikey = require('../../models/Apikey');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

const RESOURCE_NAME = 'apikey';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;

module.exports = app => {
  app.post(URI, auth, async (req, res) => {
    let apikey;
    try {
      apikey = await new Apikey(req.body).save();
      await User.findByIdAndUpdate(req.user._id, {
        apikeyId: apikey._id
      });
      res.send(apikey);
    } catch (err) {
      if (apikey !== undefined) {
        try {
          await Apikey.findByIdAndRemove(apikey._id);
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

  app.put(URI, auth, async (req, res) => {
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

  app.delete(URI, auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const deletedApikey = await Apikey.findByIdAndRemove(user.apikeyId);
      await User.findByIdAndUpdate(req.user._id, {
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
  // app.get(URI, auth, async (req, res) => {
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
