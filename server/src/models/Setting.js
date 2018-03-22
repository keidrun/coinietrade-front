const mongoose = require('mongoose');
const { Schema } = mongoose;

const settingSchema = new Schema({
  chartSet: {
    bitflyerChart: {
      type: Boolean,
      default: true
    },
    coincheckChart: {
      type: Boolean,
      default: true
    },
    zaifChart: {
      type: Boolean,
      default: true
    }
  }
});

const Setting = mongoose.model('settings', settingSchema);

module.exports = Setting;
