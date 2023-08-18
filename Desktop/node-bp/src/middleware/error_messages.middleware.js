const config = require('../../config/conf');

module.exports = (status) => {
  if (status === 401) {
    return config.errorUnauthorized;
  }
  if (status === 403) {
    return config.errorForbidden;
  }
  if (status === 404) {
    return config.errorNotFound;
  }
  if (status / 100 === 4) {
    return config.errorDefault400;
  }
  return config.errorDefault;
};
