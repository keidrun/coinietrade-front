const { Router } = require('express');
const { auth, handleValidationErrors } = require('../../middleware');
const { addRuleValidator, updateRuleValidator } = require('../../validators');
const { RulesController } = require('../../controllers');

const rulesRoutes = new Router();
const rulesController = new RulesController();

rulesRoutes.get('/', auth, rulesController.findAll);
rulesRoutes.post(
  '/',
  auth,
  addRuleValidator,
  handleValidationErrors,
  rulesController.add,
);
rulesRoutes.patch(
  '/:ruleId',
  auth,
  updateRuleValidator,
  handleValidationErrors,
  rulesController.update,
);
rulesRoutes.delete('/:ruleId', auth, rulesController.remove);

module.exports = rulesRoutes;
