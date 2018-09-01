const { Router } = require('express');
const { authorize, handleValidationErrors } = require('../../middleware');
const { PRIVILEGE_PERMISSIONS } = require('../../models');
const {
  addRuleValidator,
  updateRuleValidator,
} = require('../../middleware/validators');
const { RulesController } = require('../../controllers');

const rulesRoutes = new Router();
const rulesController = new RulesController();

rulesRoutes.get(
  '/',
  authorize(PRIVILEGE_PERMISSIONS.RULES),
  rulesController.findAll,
);
rulesRoutes.get(
  '/:ruleId',
  authorize(PRIVILEGE_PERMISSIONS.RULES),
  rulesController.findOne,
);
rulesRoutes.post(
  '/',
  authorize(PRIVILEGE_PERMISSIONS.RULES),
  addRuleValidator,
  handleValidationErrors,
  rulesController.add,
);
rulesRoutes.patch(
  '/:ruleId',
  authorize(PRIVILEGE_PERMISSIONS.RULES),
  updateRuleValidator,
  handleValidationErrors,
  rulesController.update,
);
rulesRoutes.delete(
  '/:ruleId',
  authorize(PRIVILEGE_PERMISSIONS.RULES),
  rulesController.remove,
);

module.exports = rulesRoutes;
