const usersById = new Map();

export const userMemory = {
  replaceAll(users) {
    usersById.clear();

    for (const user of users) {
      usersById.set(Number(user.id), user);
    }
  },

  set(user) {
    usersById.set(Number(user.id), user);
  },

  getById(id) {
    return usersById.get(Number(id)) || null;
  },

  values() {
    return [...usersById.values()];
  },

  size() {
    return usersById.size;
  }
};
