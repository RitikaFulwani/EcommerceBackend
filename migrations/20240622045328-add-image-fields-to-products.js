'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'imageFilename', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Products', 'imagePath', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'imageFilename');
    await queryInterface.removeColumn('Products', 'imagePath');
  }
};
