const baseError = require('../utils/baseError');

module.exports = {
  getAllProductsService: async () => {
      throw new baseError('No User', 404, 'Throwing from service without try catch block', true)
  },
};
