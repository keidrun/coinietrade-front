const {
  Privilege,
  PRIVILEGE_ROLES,
  PRIVILEGE_PERMISSIONS,
} = require('../../../src/models');

beforeEach(async () => {
  await Privilege.remove({});
});

const privileges = [
  {
    role: PRIVILEGE_ROLES.DEFAULT,
    permissions: [
      PRIVILEGE_PERMISSIONS.AUTH,
      PRIVILEGE_PERMISSIONS.EVENTS,
      PRIVILEGE_PERMISSIONS.USER,
      PRIVILEGE_PERMISSIONS.RULES,
      PRIVILEGE_PERMISSIONS.POLICY,
    ],
  },
];

describe('Privilage model', () => {
  test('should save a privilage', async () => {
    const privilege = new Privilege(privileges[0]);

    expect(privilege.isNew).toBeTruthy();
    const savedPrivilege = await privilege.save();
    expect(savedPrivilege.isNew).toBeFalsy();
    expect(savedPrivilege.role).toEqual(privileges[0].role);
    expect(savedPrivilege.permissions).toEqual(
      expect.arrayContaining(privileges[0].permissions),
    );
  });
});
