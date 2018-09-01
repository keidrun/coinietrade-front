const { Router } = require('express');
const { authorize } = require('../../middleware');
const { PRIVILEGE_PERMISSIONS } = require('../../models');
const { PolicyController } = require('../../controllers');

const policyRoutes = new Router();
const policyController = new PolicyController();

policyRoutes.get(
  '/',
  authorize(PRIVILEGE_PERMISSIONS.POLICY),
  policyController.find,
);

module.exports = policyRoutes;
