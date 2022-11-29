"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ChatData", {
      id_message: {
        type: Sequelize.INTEGER,
      },      
      id_user: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.TEXT,
      },
      time: {
        type: Sequelize.TEXT,
      },
      seen: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ChatData");
  },
};
