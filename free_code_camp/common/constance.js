export const users = [];
export const roles = {
  admin: {
    can: ['read', 'write', 'delete'],
  },
  editor: {
    can: ['read', 'write'],
  },
  viewer: {
    can: ['read'],
  },
};

// export default { roles, users };
