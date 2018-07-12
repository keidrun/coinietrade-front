const mongoose = require('mongoose');

const { Schema } = mongoose;
const uuid = require('uuid');

const settingSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuid.v4(),
  },
  chartSet: {
    bitflyerChart: {
      type: Boolean,
      required: true,
      default: true,
    },
    coincheckChart: {
      type: Boolean,
      required: true,
      default: true,
    },
    zaifChart: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
});

const Setting = mongoose.model('settings', settingSchema);

module.exports = Setting;
