const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const PRIVILEGE_ROLES = {
  DEFAULT: 'default',
};

const PRIVILEGE_PERMISSIONS = {
  AUTH: 'auth',
  EVENTS: 'events',
  USER: 'user',
  RULES: 'rules',
  POLICY: 'policy',
};

const options = {
  timestamps: true,
};

const privilegeSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      default: () => uuid.v4(),
    },
    role: {
      type: String,
      required: true,
      unique: true,
      default: PRIVILEGE_ROLES.DEFAULT,
    },
    permissions: {
      type: Array,
      default: [],
    },
  },
  options,
);

const Privilege = mongoose.model('privileges', privilegeSchema);

module.exports = {
  Privilege,
  PRIVILEGE_ROLES,
  PRIVILEGE_PERMISSIONS,
};
