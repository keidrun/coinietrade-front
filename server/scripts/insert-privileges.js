const { mongooseService } = require('../src/services');
const {
  Privilege,
  PRIVILEGE_ROLES,
  PRIVILEGE_PERMISSIONS,
} = require('../src/models');

mongooseService.connect();

const deleteAll = () => Privilege.remove({});

const insertMasterData = () => {
  const privilege = new Privilege({
    role: PRIVILEGE_ROLES.DEFAULT,
    permissions: [
      PRIVILEGE_PERMISSIONS.AUTH,
      PRIVILEGE_PERMISSIONS.EVENTS,
      PRIVILEGE_PERMISSIONS.USER,
      PRIVILEGE_PERMISSIONS.RULES,
      PRIVILEGE_PERMISSIONS.POLICY,
    ],
  });
  return privilege.save();
};

Promise.all([deleteAll(), insertMasterData()])
  .then(results => {
    console.log('Inserted: ', results[1]);
  })
  .catch(error => {
    console.log('Error: ', error);
  })
  .then(() => {
    mongooseService.disconnect();
  });
