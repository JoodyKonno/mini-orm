module.exports = {
  where(params) {
    return Object.keys(params)
      .map(field => `${field} = :${field}`)
      .join(' ');
  },

  bindMap(params) {
    return Object.keys(params)
      .reduce((map, field) => {
        map[`:${field}`] = params[field];
        return map;
      }, {});
  },
};
