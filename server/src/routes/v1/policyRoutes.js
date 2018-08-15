const { Router } = require('express');
const { auth } = require('../../middleware');
const { PolicyController } = require('../../controllers');

const policyRoutes = new Router();
const policyController = new PolicyController();

policyRoutes.get('/', auth, policyController.find);

module.exports = policyRoutes;
